import { Player } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { announce, isUndefined } from "../../utils";
import { bedrockServer } from "bdsx/launcher";

command.register("ban-item-from-hand", "Ban the item that is on your hand.").overload(async (input, origin, output) => {
    const player = origin.getEntity() as Player;
    if (isUndefined(player)) return;
    const carriedItem = player.getCarriedItem().getName();
    bedrockServer.executeCommand(`banitem ${carriedItem}`);
    announce(player, `item §l§e${carriedItem}§r banned succesfully.`);
}, {});
