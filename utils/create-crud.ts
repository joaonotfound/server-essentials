import { Form, FormButton, FormItemButton } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { CollectionItem } from "./create-collection";
import { Collection } from "./create-collection";
import { isUndefined } from "./is-undefined";
import { FormItem } from "bdsx/bds/form";
import { v4 } from "uuid";
import { group } from "console";


type Selector<T extends CollectionItem> = (ni: NetworkIdentifier) => Promise<T | null>

export interface CRUD<T extends CollectionItem> {
    create: (ni: NetworkIdentifier) => Promise<T>,
    update: (ni: NetworkIdentifier) => Promise<T>,
    remove: (ni: NetworkIdentifier) => void,
    selector: Selector<T>
}

export type DocumentProperty <T> =  {
    propertyName: keyof T,
    default?: any
} & FormItem



const convertValuesToObject = (keys: Array<any>, values: Array<any>) => {
    const response: any = {}
    for(let index = 0; index < keys.length; index++){
        response[keys[index]] = values[index]
    }
    return response
}

const loadDefaults = <T> (properties: DocumentProperty<T>[], document: T ): DocumentProperty<T>[] => {
    const response = []
    for(let index = 0; index < properties.length; index++){
        let item = properties[index]
        item.default = document[item.propertyName]
        response.push(item)
    }
    return response
}
const selectDocument = async <T extends CollectionItem> (collection: Collection<T>, mainProperty: keyof T, ni: NetworkIdentifier, groupBy?: keyof T, iconProperty?: keyof T): Promise<T | null> => {
    type MenuItem = { text: string, icon?: string }
    const selectDocumentReturnIndex = (items: MenuItem[]): Promise<number | null> => {
        return Form.sendTo(ni, {
            type: "form",
            title: "Choose",
            content: "Select one item",
            buttons: [
                ...items.map(item =>
                        ({ text: item.text ? JSON.stringify(item.text) : "undefined", image: item.icon ? { type: 'path', data: item.icon } :  undefined } as FormItemButton ))]
    })}
    const extractGroups = (items: T[], by: keyof T) => {
        const groups = new Set<string>()
        items.filter(doc => groups.add(doc[by] as string))
        return Array.from(groups)
    }
    const documents = collection.load()

    let selectedGroup: string | null
    if(groupBy){
        const groups = extractGroups(documents, groupBy)
        const selectedGroupIndex = await selectDocumentReturnIndex(groups.map(item => ({ text: item })))
        if(selectedGroupIndex){
            selectedGroup = groups[selectedGroupIndex]
    }}

    const filteredDocuments = (selectedGroup!
        ? documents.filter(doc => doc[groupBy!] == selectedGroup)
        : documents
    )
    const selectedDocumentIndex = await selectDocumentReturnIndex(
        filteredDocuments.map(doc => ({text: doc[mainProperty] as string, icon: iconProperty ? doc[iconProperty] : undefined} as MenuItem))
    )
    return !isUndefined(selectedDocumentIndex) ? filteredDocuments[selectedDocumentIndex!] : null
}

const makeCreateFunction = <T extends CollectionItem> (title: string, properties: DocumentProperty<T>[], collection: Collection<T>) => {
    return async (ni: NetworkIdentifier) => {
        const formResponse = await Form.sendTo(ni, {
            type: "custom_form",
            title: `Create ${title}`,
            content: [
                ...properties
            ]
        })
        if(isUndefined(formResponse)) return
        const item = { key: v4(), ...convertValuesToObject(properties.map(property => property.propertyName), formResponse!) }
        await collection.add(item)
        return item
    }
}

const makeUpdateFunction = <T extends CollectionItem> (title: string, properties: DocumentProperty<T>[], collection: Collection<T>, selector: Selector<T>) => {
    return async (ni: NetworkIdentifier) => {
        const selectedDocument = await selector(ni)
        if(isUndefined(selectedDocument)) return

        const formResponse = await Form.sendTo(ni, {
            type: "custom_form",
            title: `Edit ${title}`,
            content: [
                ...loadDefaults(properties, selectedDocument!)
            ]
        })

        if(isUndefined(formResponse)) return
        const editedItem = {...selectedDocument, ...convertValuesToObject(properties.map(property => property.propertyName), formResponse!)}

        await collection.update(editedItem)
        return editedItem
    }
}

const makeRemoveFunction = <T extends CollectionItem> (collection: Collection<T>, selector: Selector<T>) => {
    return async (ni: NetworkIdentifier) => {
        const selectedItem = await selector(ni)
        if(isUndefined(selectDocument)) return
        await collection.remove(selectedItem!)
    }
}
export const createCrud = <T extends CollectionItem> ({ collection, modalTitle, properties, publicLabelProperty, groupBy, iconProperty }: {
    modalTitle: string,
    collection: Collection<T>,
    properties: DocumentProperty<T>[],
    publicLabelProperty: keyof T,
    groupBy?: keyof T,
    iconProperty?: keyof T
}): CRUD<T> => {

    const selector: Selector<T> = (ni: NetworkIdentifier) => selectDocument(collection, publicLabelProperty, ni, groupBy, iconProperty )

    return {
        create: makeCreateFunction(modalTitle, properties, collection),
        update: makeUpdateFunction(modalTitle, properties, collection, selector),
        remove: makeRemoveFunction(collection, selector),
        selector
    }
}