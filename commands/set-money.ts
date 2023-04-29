import { ActorCommandSelector, CommandPermissionLevel } from "bdsx/bds/command";
import { Player } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { int32_t } from "bdsx/nativetype";
import { announce, isUndefined, openPlayerStorage, savePlayerStorage } from "../utils";

command.register('setmoney', 'set money of a player', CommandPermissionLevel.Operator)
    .overload(async (params, origin, output) => {
        for(const actor of params.players.newResults(origin)){
            const playerStorage = await openPlayerStorage(actor)
            if(isUndefined(playerStorage) || !(actor instanceof Player)) continue

            playerStorage!.money = params.quantity
            savePlayerStorage(actor, playerStorage!)
            announce(actor, 'monet set successfully.')
        }
     }, { players: ActorCommandSelector, quantity: int32_t })