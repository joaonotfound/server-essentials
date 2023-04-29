import { command } from "bdsx/command";
import { announce, isOperator, openPlayerStorage } from "../../utils";
import { ServerPlayer } from "bdsx/bds/player";
import { bedrockServer } from "bdsx/launcher";
import { isUndefined } from "../../utils/is-undefined";
import { CommandResultType } from "bdsx/commandresult";
import { CommandPermissionLevel } from "bdsx/bds/command";

command.register('wem', 'move construction', CommandPermissionLevel.Operator).overload(async (params, origin, output) => {
    const player = origin.getEntity() as ServerPlayer
    const player_cords = player.getPosition()
    const { we_pos1, we_pos2 } = await openPlayerStorage(player)

    if(isUndefined(we_pos1, we_pos2)) return

    const command = `clone ${we_pos1.x} ${we_pos1.y} ${we_pos1.z} ${we_pos2.x} ${we_pos2.y} ${we_pos2.z} ${player_cords.x} ${player_cords.y} ${player_cords.z} replace move`
    bedrockServer.executeCommand(command, CommandResultType.OutputAndData)

    announce(player, 'objeto movido com sucesso.')
    // })
}, {})