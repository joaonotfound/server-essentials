import { CollectionItem, createCollection } from "../../utils";

export type Menu = {
    label: string,
    command_name: string,
    icon_path?: string

} & CollectionItem

export const menuCollection = createCollection<Menu>('menu')