import { command } from "bdsx/command"
import { CommandPermissionLevel } from "bdsx/bds/command"
import { storeItemsCollection } from "../utils/store-storage"
import { isUndefined } from "../../utils"
import { announce } from "../../utils"
import { selectShopItem } from "../utils/select-shop-item"
import { Player } from "bdsx/bds/player"
import { profitableItemsCollections } from "../utils/profitable-items-collection"
import { selectProfItem } from "../utils/select-prof-item"

command.register('delete-prof-item', 'delte profitable item', CommandPermissionLevel.Operator).overload(async (_, origin, _2) => {
    const player = origin.getEntity()
    const ni = player?.getNetworkIdentifier()
    if(isUndefined(player, ni)) return

    const profItems = profitableItemsCollections.load()
    if(profItems.length == 0){
        announce(player as Player, `There's no item to be deleted.`)
        return
    }

    const selectedItem = await selectProfItem(ni!)
    if(isUndefined(selectedItem)) return

    await profitableItemsCollections.remove(selectedItem!)
}, {})