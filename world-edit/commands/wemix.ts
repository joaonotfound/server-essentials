import { command } from "bdsx/command";
import { CommandPermissionLevel } from "bdsx/bds/command";
import { Player, ServerPlayer } from "bdsx/bds/player";
import { CommandResultType } from "bdsx/commandresult";
import { bedrockServer } from "bdsx/launcher";
import { openPlayerStorage } from "../../utils";
import { isUndefined } from "../../utils";
import { announce } from "../../utils";
import { Command } from "bdsx/bds/command";
import { CxxString, int32_t } from "bdsx/nativetype";

type Position = { x: number; y: number; z: number };
const getSize = (pos1: Position, pos2: Position) => {
    return { x: pos1.x - pos2.x, y: pos1.y - pos2.y, z: pos1.z - pos2.z };
};
const randint = (range: number) => Math.round(Math.random() * range);

command.register("wemix", "fill with mixed blocks", CommandPermissionLevel.Operator).overload(
    async (params, origin, output) => {
        const player = origin.getEntity() as Player;
        const { we_pos1, we_pos2 } = await openPlayerStorage(player);

        const greaterThanOne = (number: number) => Math.max(Math.abs(number), 1);
        const sizeVec3 = getSize(we_pos1, we_pos2);
        const sizeVec1 = greaterThanOne(sizeVec3.x) * greaterThanOne(sizeVec3.y) * greaterThanOne(sizeVec3.z);

        bedrockServer.executeCommand(
            `fill ${we_pos1.x} ${we_pos1.y} ${we_pos1.z} ${we_pos2.x} ${we_pos2.y} ${we_pos2.z} ${params.block.getName()} ${params.blockState ?? "[]"}`,
        );
        console.log(sizeVec3, Math.abs(sizeVec1));

        for (let block = 0; block < Math.abs(sizeVec1); block++) {
            const command = `setblock ${we_pos1.x - randint(sizeVec3.x)} ${we_pos1.y - randint(sizeVec3.y)} ${
                we_pos1.z - randint(sizeVec3.z)
            } ${params.block2.getName()} ${params.blockState2 ?? "[]"}`;
            bedrockServer.executeCommand(command);
        }

        announce(player, "espaço preeenchido com sucesso.");
    },
    {
        block: Command.Block,
        blockState: [CxxString, true],
        block2: Command.Block,
        blockState2: [CxxString, true],
    },
);
