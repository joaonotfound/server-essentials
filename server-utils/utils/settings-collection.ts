import { CollectionItem, createCollection } from "../../utils";

export type Setting = {
    name: string,
    value: string
} & CollectionItem

export const settingsCollection = createCollection<Setting>('settings')