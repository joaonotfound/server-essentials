import { Player } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { bedrockServer } from "bdsx/launcher";
import { announce, isUndefined, openPlayerStorage } from "../../utils";
import { plotsCollection } from "../utils/plots-collection";

command.register('home', 'teleport you to your home').overload(
    async (params, origin, output) => {
        const player = origin.getEntity() as Player
        if(isUndefined(player)) return

        const storage = await openPlayerStorage(player)
        if(isUndefined(storage.home)) return announce(player, "you don't have a home", true)

        const playerPlot = plotsCollection.find('key', storage.home)
        bedrockServer.executeCommand(`tp "${player.getNameTag()}" ${playerPlot?.cord_x} ${playerPlot?.cord_y} ${playerPlot?.cord_z}`)
    }, {}
)