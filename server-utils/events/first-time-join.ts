import { events } from "bdsx/event";
import { savePlayerStorage, openPlayerStorage } from "../../utils";
import { createPlot } from "../utils/create-plot";

// events.playerJoin.on(async ({ player }) => {
//     const storage = await openPlayerStorage(player)
//     if (!storage.home) {
//         const plot = await createPlot(player)
//         storage.home = plot.key
//         savePlayerStorage(player, storage)
//     }
// })

// events.playerJoin.on(async ({ player }) => {
//     const storage = await openPlayerStorage(player)
//     if(storage.first_join){
//         bedrockServer.executeCommand(`give "${player.getNameTag()}" stone_pickaxe 1 0 {"minecraft:can_destroy":{"blocks":["stone", "iron_ore", "lapis_ore", "copper_ore"]}}"`)
//         storage.first_join = false
//         savePlayerStorage(player, storage)
//     }
// })
