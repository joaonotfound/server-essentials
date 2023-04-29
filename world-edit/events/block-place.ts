import { events } from "bdsx/event"
import { bedrockServer } from "bdsx/launcher"
import { isGoldenBlock, isOperator, announce } from "../../utils"
import { setWePosition } from "../utils/update-pos"

events.blockPlace.on(async event => {
    const pos = { x: event.blockPos.x, y: event.blockPos.y , z: event.blockPos.z }

    if(isOperator(event.player) && isGoldenBlock(event.block)){
        setWePosition(event.player, pos)
        bedrockServer.executeCommand(`setblock ${pos.x} ${pos.y} ${pos.z} air`)
    }
})