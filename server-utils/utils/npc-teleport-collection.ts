import { CollectionItem, createCollection } from "../../utils"

export type NPC_TELEPORT = {
    npc_name: string,
    label: string,
    tag?: string,
    iconPath?: string,
    x: string,
    y: string,
    z: string
} & CollectionItem

export const NPCTeleportCollection = createCollection<NPC_TELEPORT>('npc-teleports')
