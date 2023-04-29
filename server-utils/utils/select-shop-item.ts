import { NetworkIdentifier } from "bdsx/bds/networkidentifier"
import { StoreItem } from "./store-storage"
import { storeItemsCollection } from "./store-storage"
import { Form } from "bdsx/bds/form"

export const selectShopItem = async (ni: NetworkIdentifier): Promise<StoreItem | null> => {
    const items = storeItemsCollection.load()
    const response = await Form.sendTo(ni, {
        type: 'custom_form',
        title: "Select an item",
        content: [
            { type: "dropdown", text: "item", options: items.map(item => item.itemName), default: 0 }
        ]
    })
    return response ? items[response[0]] : null
}
