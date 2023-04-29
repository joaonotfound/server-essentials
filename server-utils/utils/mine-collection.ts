import { CollectionItem, createCollection } from "../../utils"

export type Mine = {
    tag: string,
    block1: string,
    block2: string,
    x: string,
    y: string,
    z: string,
    x2: string,
    y2: string,
    z2: string,
} & CollectionItem

export const minesCollection = createCollection<Mine>('mines')