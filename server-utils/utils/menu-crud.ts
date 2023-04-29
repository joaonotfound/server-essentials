import { createCrud, DocumentProperty } from "../../utils";
import { Menu, menuCollection } from "./menu-collection";


export const properties: DocumentProperty<Menu>[] = [
    { type: "input", text: "Label", propertyName: "label"},
    { type: "input", text: "Command's name", propertyName: "command_name"},
    { type: "input", text: "Icon path ( optional )", propertyName: "icon_path"}
]

export const menuCrud = createCrud({
    collection: menuCollection,
    modalTitle: "Menu",
    properties,
    publicLabelProperty: 'label',
    iconProperty: 'icon_path'
})