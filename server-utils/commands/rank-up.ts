import { Player } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { bedrockServer } from "bdsx/launcher";
import { int32_t } from "bdsx/nativetype";
import { announce, isUndefined, openPlayerStorage, savePlayerStorage } from "../../utils";
import { settingsCollection } from "../utils/settings-collection";

command.register('rankup', 'increase your rank').overload(
    async (params, origin, output) => {
        const player = origin.getEntity()
        const rankPrice = settingsCollection.find('name', 'rank-price')?.value
        if(isUndefined(player, rankPrice) || !(player instanceof Player)) return

        const storage = await openPlayerStorage(player)
        const totalPrice = parseInt(rankPrice!) * (params.ranks ?? 1)
        if(storage.money < totalPrice){
            announce(player, `You don't have enough money to increase ${params.ranks ?? 1} ranks`, true)
            return announce(player, `rank price: $${rankPrice}`, true)
        }
        storage.money -= totalPrice
        savePlayerStorage(player, storage)
        bedrockServer.executeCommand(`scoreboard players add "${player.getNameTag()}" level ${params.ranks ?? 1}`)
        bedrockServer.executeCommand(`playsound random.levelup "${player.getNameTag()}"`)
        bedrockServer.executeCommand(`execute as "${player.getNameTag()}" run titleraw @s actionbar {"rawtext":[{"text":"§lCongratulations! you're now rank §e"},{"score":{"name":"@s","objective":"level"}}]}`)
    }, {
        ranks: [int32_t, true]
    }
)