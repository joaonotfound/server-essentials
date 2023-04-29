import { Player } from "bdsx/bds/player";
import { bedrockServer } from "bdsx/launcher";

export const announce = (player: Player, text: string, orb: boolean = false) => {
    const rawtext = {
        rawtext: [
            { text: "§f[§c!§f] " },
            { selector: "@s"},
            { text }
        ]
    }
    const command = `tellraw "${player.getNameTag()}" ${JSON.stringify(rawtext)}`
    bedrockServer.executeCommand(command)
    if(orb) bedrockServer.executeCommand(`playsound random.orb "${player.getNameTag()}"`)
}