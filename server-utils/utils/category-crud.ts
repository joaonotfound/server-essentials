import { createCrud, DocumentProperty } from "../../utils/create-crud";
import { categoriesCollection, Category } from "./category-collection";

const properties: DocumentProperty<Category>[] = [
    { type: "input", propertyName: "name", text: "Category Name" },
    { type: "input", propertyName: "path_image", text: "Image Path" }
]

export const categoryCRUD = createCrud({
    collection: categoriesCollection,
    modalTitle: 'category',
    properties,
    publicLabelProperty: 'name'
})