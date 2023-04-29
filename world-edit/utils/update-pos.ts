import { Player } from "bdsx/bds/player"
import { announce, openPlayerStorage, savePlayerStorage } from "../../utils"

export const setWePosition = async (player: Player, pos: any) => {

    const data = await openPlayerStorage(player)
    if(data.we_pos_toggle == undefined){
        data.we_pos_toggle = -1
    }
    data.we_pos_toggle *= -1
    if(data.we_pos_toggle == 1){
        data.we_pos1 = pos
    }else{
        data.we_pos2 = pos
    }
    await savePlayerStorage(player, data)
    announce(player, `Position §e${data.we_pos_toggle == 1 ? 1 : 2}§r defined §e${pos.x} ${pos.y} ${pos.z}`)
}