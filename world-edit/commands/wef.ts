import { command } from "bdsx/command";
import { Command, CommandPermissionLevel } from "bdsx/bds/command";
import { announce, isOperator, openPlayerStorage } from "../../utils";
import { ServerPlayer } from "bdsx/bds/player";
import { bedrockServer } from "bdsx/launcher";
import { isUndefined } from "../../utils/is-undefined";
import { CxxString, int32_t } from "bdsx/nativetype";

command.register('wef', 'fill', CommandPermissionLevel.Operator).overload(async (params, origin, output) => {
    const player = origin.getEntity() as ServerPlayer
    const { we_pos1, we_pos2 } = await openPlayerStorage(player)

    if(isUndefined(we_pos1, we_pos2)) return

    bedrockServer.executeCommand(`fill ${we_pos1.x} ${we_pos1.y} ${we_pos1.z} ${we_pos2.x} ${we_pos2.y} ${we_pos2.z} ${params.block.getName()} ${params.id ?? 0} ${params.fillmode ?? ''}`)
    announce(player, 'área preenchida com sucesso.')
}, {
    block: Command.Block,
    id: [int32_t, true],
    fillmode: [CxxString, true]
})