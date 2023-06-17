import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";
import { isOperator } from "../../utils";
import { isUndefined } from "../../utils/is-undefined";
import { bannedItemsCollection } from "../utils/banned-items-storage";

events.playerInventoryChange.on(async event => {
    const itemName = event.newItemStack.getName();
    const player = event.player;
    if (!player.isSpawned()) return console.log("Player is not spawned");

    if (isUndefined(itemName, player)) return console.log("itemName or player is undefined.");
    if (!isOperator(player)) {
        const item = bannedItemsCollection.find("itemName", itemName);
        if (isUndefined(item)) return;
        if (item?.banned) {
            bedrockServer.executeCommand(`tellraw @a {"rawtext":[{"text": "[§c!§f] §c"},{"text":" ${player.getNameTag()} §eis trying to get §f${itemName}"}]}`);
            event.newItemStack.setAmount(0);
            console.log(player.getNameTag(), " is getting banned item: ", itemName);
        }
    }
});
