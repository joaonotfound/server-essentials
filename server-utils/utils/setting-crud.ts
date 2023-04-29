import { createCrud, DocumentProperty } from "../../utils";
import { Setting, settingsCollection } from "./settings-collection";

export const settingsProperties: DocumentProperty<Setting>[] = [
    { type: "input", text: "Name", propertyName: "name" },
    { type: "input", text: "Value", propertyName: "value" }
]

export const settingCrud = createCrud<Setting>({
    collection: settingsCollection,
    modalTitle: 'Settings',
    properties: settingsProperties,
    publicLabelProperty: 'name'
})