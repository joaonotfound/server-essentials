import { command } from "bdsx/command"
import { CommandPermissionLevel } from "bdsx/bds/command"
import { storeItemsCollection } from "../utils/store-storage"
import { isUndefined } from "../../utils"
import { announce } from "../../utils"
import { selectShopItem } from "../utils/select-shop-item"
import { Player } from "bdsx/bds/player"

command.register('delete-shop-item', 'edit shop item', CommandPermissionLevel.Operator).overload(async (_, origin, _2) => {
    const player = origin.getEntity()
    const ni = player?.getNetworkIdentifier()
    if(isUndefined(player, ni)) return

    const storeItems = storeItemsCollection.load()
    if(storeItems.length == 0){
        announce(player as Player, `There's no item on the store to be deleted.`)
        return
    }

    const selectedItem = await selectShopItem(ni!)
    if(isUndefined(selectedItem)) return

    await storeItemsCollection.remove(selectedItem!)
}, {})