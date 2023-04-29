import { command } from "bdsx/command";
import { bedrockServer } from "bdsx/launcher";
import { isUndefined } from "../../utils";
import { menuCrud } from "../utils/menu-crud";

command.register('menu', 'open menu').overload(
    async (params, origin, output) => {
        const player = origin.getEntity()
        const ni = player?.getNetworkIdentifier()
        if(isUndefined(player)) return

        const selectedItem = await menuCrud.selector(ni!)
        if(isUndefined(selectedItem)) return

        bedrockServer.executeCommand(`execute as "${player?.getNameTag()}" run ${selectedItem?.command_name}`)
    }, {}
)