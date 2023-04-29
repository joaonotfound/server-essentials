import { createCrud, DocumentProperty } from "../../utils";
import { Mine, minesCollection } from "./mine-collection";

const MineProperties: DocumentProperty<Mine>[] = [
    { type: 'input', propertyName: 'tag', text: "Tag" },
    { type: 'input', propertyName: 'block1', text: "First block" },
    { type: 'input', propertyName: 'block2', text: "Second block" },
    { type: 'input', propertyName: 'x', text: "x" },
    { type: 'input', propertyName: 'y', text: "y" },
    { type: 'input', propertyName: 'z', text: "z" },
    { type: 'input', propertyName: 'x2', text: "x2" },
    { type: 'input', propertyName: 'y2', text: "y2" },
    { type: 'input', propertyName: 'z2', text: "z2" },
]

export const minesCrud = createCrud({
    collection: minesCollection,
    modalTitle: 'Mine',
    properties: MineProperties,
    publicLabelProperty: 'tag'
})