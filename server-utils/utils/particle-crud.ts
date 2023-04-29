
import { createCrud, DocumentProperty } from "../../utils"
import { Particle, particleCollection } from "./particles-collection"

const particleProperties: DocumentProperty<Particle>[] = [
    { type: 'input', propertyName: "command_name", text: "Command Name" },
    { type: 'input', propertyName: "category", text: "Category" },
    { type: 'input', propertyName: "x", text: "x" },
    { type: 'input', propertyName: "y", text: "y" },
    { type: 'input', propertyName: "z", text: "z" }
]

// export const particleCrud = createCrud(particleCollection, 'particle', particleProperties, 'command_name')
export const particleCrud = createCrud({
    collection: particleCollection,
    modalTitle: 'particle',
    properties: particleProperties,
    publicLabelProperty: 'command_name',
    groupBy: 'category'
})