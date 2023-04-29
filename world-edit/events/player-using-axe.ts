import { getBlockOnView } from "../utils/get-block-on-view"
import { isOperator, isUndefined } from "../../utils"
import { setWePosition } from "../utils/update-pos"
import { Player } from "bdsx/bds/player"
import { bedrockServer } from "bdsx/launcher"
import { events } from "bdsx/event"

events.itemUse.on(event => {
    if(event.itemStack.getItem()?.getCommandName() == 'minecraft:wooden_axe' && isOperator(event.player)){
        handle(event.player)
    }
})

function handle(player: Player){
    for(let distance = 0; distance < 6; distance+=0.5){
        const blockOnView = getBlockOnView(player, distance)
        if(!isUndefined(blockOnView)){
            const { position, block } =  blockOnView!
            bedrockServer.executeCommand(`setblock ${position.x} ${position.y} ${position.z} stained_glass 6`)
            setTimeout(() => {
                bedrockServer.executeCommand(`setblock ${position.x} ${position.y} ${position.z} ${block.getName()} ${block.getVariant()}`)
                bedrockServer.executeCommand(`playsound random.orb "${player.getNameTag()}"`)
                bedrockServer.executeCommand(`particle minecraft:crop_growth_area_emitter ${position.x} ${position.y-1} ${position.z}`)
                bedrockServer.executeCommand(`particle minecraft:crop_growth_area_emitter ${position.x} ${position.y} ${position.z}`)
                bedrockServer.executeCommand(`particle minecraft:crop_growth_area_emitter ${position.x} ${position.y+1} ${position.z}`)
            }, 100);
            setWePosition(player, { x: position.x, y: position.y, z: position.z })
            break
        }
    }
}


