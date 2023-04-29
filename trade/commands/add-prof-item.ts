import { CommandItem, CommandPermissionLevel } from "bdsx/bds/command";
import { PlanterItemComponent } from "bdsx/bds/item_component";
import { Player } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { int32_t } from "bdsx/nativetype";
import { v4 } from "uuid";
import { announce } from "../../utils";
import { profitableItemsCollections } from "../../server-utils/utils/profitable-items-collection";

command.register("add-prof-item", "create profitable item", CommandPermissionLevel.Operator).overload(
    (params, origin, output) => {
        const item = params.item.createInstance(1);
        profitableItemsCollections.add({
            key: v4(),
            itemName: item.getName(),
            price: params.price,
        });
        announce(origin.getEntity() as Player, "Item added successfully.");
    },
    {
        item: CommandItem,
        price: int32_t,
    },
);
