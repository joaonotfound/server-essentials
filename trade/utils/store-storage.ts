import { CollectionItem, createCollection } from "../../utils/create-collection"

export type StoreItem = {
    itemName: string,
    quantity: number,
    path_image?: string,
    price: number,
    category: string,
    components?: string
} & CollectionItem

export const storeItemsCollection = createCollection<StoreItem>('store')