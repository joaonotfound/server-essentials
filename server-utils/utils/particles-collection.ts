import { CollectionItem, createCollection } from "../../utils";

export type Particle = {
    command_name: string,
    category: string,
    x: string,
    y: string,
    z: string
} & CollectionItem

export const particleCollection = createCollection<Particle>('particle')