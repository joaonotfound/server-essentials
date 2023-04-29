import { CollectionItem, createCollection } from "../../utils";

export type Plot = {
    size: number,
    version: 'v1',
    cord_x: number,
    cord_y: number,
    cord_z: number
} & CollectionItem

export const plotsCollection = createCollection<Plot>('plots')