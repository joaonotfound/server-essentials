import { Player } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { announce, isUndefined } from "../../utils";
import { CommandPermissionLevel } from "bdsx/bds/command";

command.register("get-itemname-from-hand", "get the item name of your hand.", CommandPermissionLevel.Operator).overload(async (params, origin, output) => {
    const player = origin.getEntity() as Player;
    if (isUndefined(player)) return;

    announce(player, "Item name from your hand: §l§o" + player.getCarriedItem().getName());
}, {});
