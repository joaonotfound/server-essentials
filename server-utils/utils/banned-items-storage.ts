import { CollectionItem, createCollection } from "../../utils/create-collection"

export type BannedItem = {
    itemName: string,
    banned: boolean
} & CollectionItem

export const bannedItemsCollection = createCollection<BannedItem>('banned-item')