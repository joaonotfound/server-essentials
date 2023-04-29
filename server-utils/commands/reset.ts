import { CommandPermissionLevel, PlayerCommandSelector } from "bdsx/bds/command";
import { Player, ServerPlayer } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { announce, savePlayerStorage } from "../../utils";


command.register('reset', 'reset all data of a player', CommandPermissionLevel.Operator).overload(
    async (params, origin, output) => {
        let names = ''
        for (const player of params.player.newResults(origin, ServerPlayer)) {
            names += " " + player.getNameTag()
            savePlayerStorage(player, undefined)
        }
        announce(origin.getEntity() as Player, 'players reseted ' + names)
    }, { player: PlayerCommandSelector }
)