import { Item, PlayerInventory } from "bdsx/bds/inventory"
import { isUndefined } from "../../utils"
import { ProfitableItem, profitableItemsCollections } from "./profitable-items-collection"

export const getProfitableItemsFromInventory = (inventory: PlayerInventory): Array<{ item: ProfitableItem, amount: number, rawItem: Item }>=> {

    const slots = inventory.container.getSlots()
    const response = []

    for(let slot of slots){
        const item = slot.getItem()!
        if(isUndefined(item)) continue
        const profItem = profitableItemsCollections.find('itemName',  item.getCommandName())
        if(profItem){
            response.push({ item: profItem, amount: slot.amount, rawItem: item })
        }
    }
    return response
}