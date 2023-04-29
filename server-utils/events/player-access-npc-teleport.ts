import { events } from "bdsx/event"
import { NPCTeleportCollection, NPC_TELEPORT } from "../utils/npc-teleport-collection"
import { announce } from "../../utils"
import { bedrockServer } from "bdsx/launcher"
import { Player } from "bdsx/bds/player"

export const teleportPlayer = (player: Player, teleport: NPC_TELEPORT) => {
    if(teleport.tag){
        const playerHasTag = player.getTags().filter(tag => tag == teleport.tag).length
        if(!playerHasTag){
            return announce(player, "You don't have permission to access this teleport.", true)
        }
    }

    bedrockServer.executeCommand(`tp @a[name="${player.getNameTag()}" ${teleport.tag ? ", tag=" + teleport.tag : ''}] ${teleport.x} ${teleport.y} ${teleport.z}`)
    announce(player, `Teleporting to ${teleport.label}`, true)
}

events.playerAttack.on(event => {
    const teleports = NPCTeleportCollection.load()
    const victimName = event.victim.getNameTag()

    const [ teleport ] = teleports.filter(teleport => teleport.npc_name == victimName)
    if(!teleport) return

    teleportPlayer(event.player, teleport)
})