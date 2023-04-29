import { CollectionItem, createCollection } from "../../utils"

export type Category = {
    name: string,
    path_image: string
} & CollectionItem

export const categoriesCollection = createCollection<Category>('categories')