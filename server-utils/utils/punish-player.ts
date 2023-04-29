import { Player } from "bdsx/bds/player"
import { GameType } from "bdsx/bds/player"
import { bedrockServer } from "bdsx/launcher"
import { announce } from "../../utils"

export const punishPlayer = (player: Player, message?: string) => {
    player.setGameType(GameType.Adventure)
    bedrockServer.executeCommand(`effect "${player.getNameTag()}" blindness 10 1 true`)
    bedrockServer.executeCommand(`effect "${player.getNameTag()}" slowness 5 100 true`)
    bedrockServer.executeCommand(`playsound mob.endermen.stare "${player.getNameTag()}"`)
    player.setOnFire(5)
    announce(player, message ?? 'Você está sendo punido.')
}