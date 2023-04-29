import { CommandPermissionLevel } from "bdsx/bds/command";
import { Form } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { Player } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { announce, isUndefined } from "../../utils";
import { StoreItem, storeItemsCollection } from "../../server-utils/utils/store-storage";
import { selectShopItem } from "../../server-utils/utils/select-shop-item";

const editItem = async (ni: NetworkIdentifier, item: StoreItem) => {
    const response = await Form.sendTo(ni, {
        type: "custom_form",
        title: `editing item ${item.itemName}`,
        content: [
            { type: "input", text: "item's command name", placeholder: "diamond", default: item.itemName },
            { type: "input", text: "price", placeholder: "1", default: `${item.price}` },
            { type: "input", text: "category", placeholder: "tools", default: `${item.category}` },
            { type: "input", text: "quantity", placeholder: "1", default: `${item.quantity}` },
            { type: "input", text: "image path", placeholder: "/textures/", default: `${item.path_image}` },
            { type: "input", text: "components", placeholder: "{...}", default: item.components },
        ],
    });
    if (isUndefined(response)) return;
    const [itemName, price, category, quantity, path_image, components] = response!;
    storeItemsCollection.update({ ...item, itemName, price, quantity, components, path_image, category });
};

command.register("editshopitem", "edit shop item", CommandPermissionLevel.Operator).overload(async (_, origin, _2) => {
    const player = origin.getEntity();
    const ni = player?.getNetworkIdentifier();
    if (isUndefined(player, ni)) return;

    const storeItems = storeItemsCollection.load();
    if (storeItems.length == 0) {
        announce(player as Player, `There's no item on the store to be edited.`);
        return;
    }

    const selectedItem = await selectShopItem(ni!);
    if (isUndefined(selectedItem)) return;

    await editItem(ni!, selectedItem!);
}, {});
