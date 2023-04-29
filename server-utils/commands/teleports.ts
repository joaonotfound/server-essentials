import { Player } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { isUndefined } from "../../utils";
import { teleportPlayer } from "../events/player-access-npc-teleport";
import { NpcTeleportCrud } from "../utils/npc-teleport-crud";

command.register('teleports', 'open teleport menu').overload(
    async (params, origin, output) => {
        const player = origin.getEntity() as Player
        const ni = player?.getNetworkIdentifier()
        if(isUndefined(player, ni)) return

        const selectedTeleport = await NpcTeleportCrud.selector(ni!)
        if(isUndefined(selectedTeleport)) return

        teleportPlayer(player!, selectedTeleport!)
    }, {}
)