import { Player } from "bdsx/bds/player"
import { bedrockServer } from "bdsx/launcher"
import { v4 } from "uuid"
import { Plot, plotsCollection } from "./plots-collection"

const wait = () => new Promise(resolve => {
    setTimeout(() => {
        resolve(undefined)
    }, 1000);
})

export const createPlot = async (player: Player): Promise<Plot> => {
    const plots = await plotsCollection.load()
    const cord_x = (10_000+(plots.length * 1_000)) - 17
    const cord_y = 29
    const cord_z = -11

    const plot: Plot = {
        key: v4(),
        cord_x: (10_000+(plots.length * 1_000)),
        cord_y: 60,
        cord_z: 0,
        size: 64,
        version: 'v1'
    }

    await bedrockServer.executeCommand(`tp "${player.getNameTag()}" ${plot.cord_x} 50 ${plot.cord_z}`)
    await bedrockServer.executeCommand(`execute as "${player.getNameTag()}" at @s run structure load home_v1 ${cord_x} ${cord_y} ${cord_z}`)
    await wait()
    await bedrockServer.executeCommand(`tp "${player.getNameTag()}" ${plot.cord_x} ${plot.cord_y} ${plot.cord_z}`)

    return await plotsCollection.add(plot)
}