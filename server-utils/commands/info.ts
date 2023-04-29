import { CommandPermissionLevel, PlayerCommandSelector } from "bdsx/bds/command";
import { Player, ServerPlayer } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { announce, isUndefined, openPlayerStorage } from "../../utils";

command.register('info', "see players's info", CommandPermissionLevel.Operator).overload(
    async (params, origin, output) => {
        const originPlayer = origin.getEntity() as Player
        if(isUndefined(originPlayer)) return

        for (const player of params.player.newResults(origin, ServerPlayer)) {
            const storage = await openPlayerStorage(player)
            announce(originPlayer, `${player.getNameTag()} - ${JSON.stringify(storage)}`)
        }
    }, { player: PlayerCommandSelector }
)