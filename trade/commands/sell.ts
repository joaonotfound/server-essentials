import { Player } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { bedrockServer } from "bdsx/launcher";
import { announce, isUndefined, openPlayerStorage, savePlayerStorage } from "../../utils";
import { getProfitableItemsFromInventory } from "../../server-utils/utils/get-profitable-items-from-inventory";

command.register("sell", "sell your items").overload(async (params, origin, output) => {
    const player = origin.getEntity() as Player;
    if (isUndefined(player) || !(player instanceof Player)) return;

    const profitableItems = getProfitableItemsFromInventory(player.getInventory());

    if (profitableItems.length == 0) {
        announce(player, "you don't have any item to sell.");
        return;
    }
    const playerData = await openPlayerStorage(player);
    for (let profItem of profitableItems) {
        playerData.money += profItem.item.price * profItem.amount;
        bedrockServer.executeCommand(`clear "${player.getNameTag()}" ${profItem.item.itemName} -1 ${profItem.amount}`);
        announce(player, `selling item §l§e${profItem.amount}x${profItem.item.itemName}§r for §l§e$${profItem.item.price * profItem.amount}`);
    }
    savePlayerStorage(player, playerData);
    announce(player, "all items was sell.");
}, {});
