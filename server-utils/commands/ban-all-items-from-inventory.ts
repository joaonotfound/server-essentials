import { Player } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { announce, isUndefined } from "../../utils";
import { v4 } from "uuid";
import { bannedItemsCollection } from "../utils/banned-items-storage";
import { CommandPermissionLevel } from "bdsx/bds/command";

command.register("ban-all-from-inventory", "Ban all items that is on your inventory.", CommandPermissionLevel.Operator).overload(async (input, origin, output) => {
    const player = origin.getEntity() as Player;
    if (isUndefined(player)) return;

    for (let slot of player.getInventory().container.getSlots()) {
        let item = slot.getItem()!;
        if (isUndefined(item)) continue;
        announce(player, `banning item §l§e${item.getCommandName()}`);
        bannedItemsCollection.add({
            key: v4(),
            itemName: item.getCommandName(),
            banned: true,
        });
    }
}, {});
