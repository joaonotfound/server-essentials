import { Command, CommandItem, CommandPermissionLevel, CommandRawText } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { CxxString, int32_t } from "bdsx/nativetype";
import { v4 } from "uuid";
import { JsonValue } from "bdsx/bds/connreq";
import { announce } from "../../utils";
import { Player } from "bdsx/bds/player";
import { StoreItem, storeItemsCollection } from "../../server-utils/utils/store-storage";

command.register("sell-item", "sell item on store", CommandPermissionLevel.Operator).overload(
    (params, origin, output) => {
        const item = params.item.createInstance(1);
        const storeItem: StoreItem = {
            key: v4(),
            itemName: item.getName(),
            price: params.price,
            category: params.category ?? "others",
            quantity: params.quantity ?? 1,
            path_image: params.path_image ?? item.isBlock() ? `textures/blocks/${item.getName().split(":")[1]}` : undefined,
            components: params.component ? params.component?.toString() : undefined,
        };
        storeItemsCollection.add(storeItem);
        announce(origin.getEntity() as Player, "Succesfully added item to store.");
    },
    {
        item: CommandItem,
        price: int32_t,
        quantity: [int32_t, true],
        category: [CxxString, true],
        path_image: [CxxString, true],
        component: [JsonValue, true],
    },
);
