import { createCrud, DocumentProperty } from "../../utils";
import { NPCTeleportCollection, NPC_TELEPORT } from "./npc-teleport-collection";

export const NpcTeleportProperties: DocumentProperty<NPC_TELEPORT>[] =
    [
        { type: 'input', propertyName: 'label', text: "Label" },
        { type: 'input', propertyName: 'npc_name', text: "Npc name" },
        { type: 'input', propertyName: 'tag', text: "Player tag ( optional )" },
        { type: 'input', propertyName: 'iconPath', text: "Icon Path( optional )" },
        { type: 'input', propertyName: 'x', text: "x" },
        { type: 'input', propertyName: 'y', text: "y" },
        { type: 'input', propertyName: 'z', text: "z" },
    ]

// export const NpcTeleportCrud = createCrud(NPCTeleportCollection, 'NPC Teleport', NpcTeleportProperties, 'npc_name')
export const NpcTeleportCrud = createCrud({
    collection: NPCTeleportCollection,
    modalTitle: 'Teleport nametag',
    properties: NpcTeleportProperties,
    publicLabelProperty: 'label',
    iconProperty: 'iconPath'
})