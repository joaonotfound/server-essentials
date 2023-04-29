import { createCrud, DocumentProperty } from "../../utils"
import { Plot, plotsCollection } from "./plots-collection"

const properties: DocumentProperty<Plot>[] = []

export const plotCrud = createCrud({
    collection: plotsCollection,
    modalTitle: 'Plots',
    properties,
    publicLabelProperty: 'cord_x'
})
