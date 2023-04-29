import { NetworkIdentifier } from "bdsx/bds/networkidentifier"
import { profitableItemsCollections } from "./profitable-items-collection"
import { Form } from "bdsx/bds/form"

export const selectProfItem = async (ni: NetworkIdentifier) => {
    const profItems = profitableItemsCollections.load()
    const response = await Form.sendTo(ni, {
        type: "custom_form",
        title: "Edite profitable item",
        content: [
            { type: "dropdown", text: "select item", options: profItems.map(item => item.itemName)}
        ]
    })
    return response ? profItems[response[0]] : null
}
