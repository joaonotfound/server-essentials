import { CommandPermissionLevel } from "bdsx/bds/command";
import { Form } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { Player } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { announce, isUndefined } from "../../utils";
import { ProfitableItem, profitableItemsCollections } from "../utils/profitable-items-collection";
import { selectProfItem } from "../utils/select-prof-item";

const edit = async (ni: NetworkIdentifier, item: ProfitableItem) => {
    const response = await Form.sendTo(ni, {
        type: 'custom_form',
        title: `editing item ${item.itemName}`,
        content: [
            { type: 'input', text: "item's command name", placeholder: "diamond",  default: item.itemName },
            { type: 'input', text: "item price", placeholder: '1', default: `${item.price}` },
        ]
    })
    if(isUndefined(response)) return
    const [ itemName, price  ] = response!
    profitableItemsCollections.update({ ...item, itemName, price })
}

command.register('edit-prof-items', 'edit profitables items', CommandPermissionLevel.Operator).overload(
    async (_, origin) => {
        const player = origin.getEntity()
        const ni = player?.getNetworkIdentifier()
        if(isUndefined(player, ni)) return

        const profItems = profitableItemsCollections.load()
        if(profItems.length == 0){
            announce(player as Player, `There's no item to be edited.`)
            return
        }

        const selectedItem = await selectProfItem(ni!)
        if(isUndefined(selectedItem)) return

        await edit(ni!, selectedItem!)
    }, {}
)