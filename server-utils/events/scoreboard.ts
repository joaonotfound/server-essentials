import { bedrockServer } from "bdsx/launcher";
import { openPlayerStorage } from "../../utils";
import { BossEventPacket } from "bdsx/bds/packets";

const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD'
})

// setInterval(async () => {
//     for (const player of bedrockServer.serverInstance.getPlayers()) {
//         if(!player) return
//         const storage = await openPlayerStorage(player)
//         player.setBossBar('Status', 0.2, BossEventPacket.Colors.Blue)
//         bedrockServer.executeCommand(`execute as "${player.getNameTag()}" run titleraw @s title ` + JSON.stringify({
//             rawtext: [
//                 {"text":"\n§l -=( §eMinervile§f )=- \n"},
//                 {"text":"\n§f Name: §e"}, {"selector":"@s"},
//                 {"text":`\n§f Money: §e${formatter.format(storage.money)}`},
//                 {"text":"\n§f Rank: §e"}, {"score":{"objective":"level","name":"@s"}},
//                 {"text":"\n§f Timer: §b"},{"score":{"objective":"time", "name":"hours"}},{"text":":"}, {"score":{"objective":"time","name":"minute"}}, {"text":":"}, {"score":{"objective":"time", "name":"second"}}, {"text": "\n\n"}
//         ]}))
//     }
// }, 500);