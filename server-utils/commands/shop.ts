import { Form, FormItemButton } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { Player } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { bedrockServer } from "bdsx/launcher";
import { announce, isUndefined, openPlayerStorage, savePlayerStorage } from "../../utils";
import { categoriesCollection, Category } from "../utils/category-collection";
import { StoreItem, storeItemsCollection } from "../utils/store-storage";

const beautifyItemName = ({ itemName, quantity }: StoreItem) => {
    return `${quantity} x ${itemName.split(':')[1].replace('_', ' ')}`
}

type Order = { player: Player, item: StoreItem, quantity: number }
const createOrder = async (player: Player, item: StoreItem): Promise<Order | null> => {
    const ni = player.getNetworkIdentifier()
    const playerStorage = await openPlayerStorage(player)

    const response = await Form.sendTo(ni, {
        type: 'custom_form',
        title: "Order",
        content: [
            { type: "label", text: `item: ${item.itemName.split(':')[1]}` },
            { type: "label", text: `price: $${item.price}${item.quantity == 1 ? '/unit' : `at ${item.quantity} units`}` },
            { type: 'slider', text: "Quantity", min: 1, max: Math.floor(playerStorage.money / item.price), step: 1, default: 1 }
        ]
    })
    if(isUndefined(response)) return null
    const [ _, _2, quantity ] = response!
    return { player, item, quantity }
}

const buy = async (order: Order) => {
    const playerStorage = await openPlayerStorage(order.player)
    console.log(playerStorage)
    playerStorage.money -= order.item.price * order.quantity
    console.log(playerStorage)
    await savePlayerStorage(order.player, playerStorage)
    const giveCommand = `give "${order.player.getNameTag()}" ${order.item.itemName} ${order.quantity * order.item.quantity} 0 ${order.item.components ?? ''}`
    bedrockServer.executeCommand(giveCommand)
    console.log(giveCommand)
    announce(order.player, `You bought §l§e${order.quantity} x ${order.item.itemName}`, true)
    // bedrockServer.executeCommand(`playsound random.orb ${order.player.getNameTag()}`)

}

const listShopItems = async (player: Player, items: StoreItem[]) => {
    const ni = player?.getNetworkIdentifier()
    const playerStorage = await openPlayerStorage(player)

    const response = await Form.sendTo(ni!, {
        type: "form",
        title: "Shop",
        content: `Your wallet: ${playerStorage?.money}`,
        buttons: [
            ...items.map(item => ({ text: `${beautifyItemName(item)}: $${item.price}`, image: { type: "path", data: item.path_image ?? `textures/items/${item.itemName.split(':')[1]}`}})) as FormItemButton[]
        ]
    })
    if(isUndefined(response)) return
    const selectedItem = items[response!]
    if(playerStorage.money < selectedItem.price){
        announce(player as Player, "You don't have enough money to buy this item.")
        return
    }
    const order = await createOrder(player as Player, selectedItem)
    if(isUndefined(order)) return
    await buy(order!)
}

const selectCategory = async (player: Player) => {
    const ni = player?.getNetworkIdentifier()
    const categories = categoriesCollection.load()
    const selectedCategory = await Form.sendTo(ni, {
        type: "form",
        title: "Categories",
        content: "Select one category",
        buttons: [
            ...Array.from(categories.values()).map(category => ({ text: category.name, image: category.path_image ? { type: "path", data: category.path_image } : undefined })) as FormItemButton[]
        ]
    })
    if(isUndefined(selectedCategory)) return

    const categoryItems = storeItemsCollection.findAll('category', Array.from(categories.values())[selectedCategory!].name)
    listShopItems(player, categoryItems!)
}

command.register('shop', 'see shop').overload(async (params, origin, output) => {
    const player = origin.getEntity()
    const ni = player?.getNetworkIdentifier()
    if(isUndefined(player, ni)) return

    const items = storeItemsCollection.load()

    if(items.length == 0){
        announce(player as Player, `There's no item on shop`)
        return
    }
    selectCategory(player as Player)

}, {})