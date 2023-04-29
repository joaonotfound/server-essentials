import { CollectionItem, createCollection } from "../../utils";


export type ProfitableItem = {
    itemName: string,
    price: number
} & CollectionItem

export const profitableItemsCollections = createCollection<ProfitableItem>('profitable-items')