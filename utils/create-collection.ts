import { Storage, storageManager } from "bdsx/storage"
import { isUndefined } from "./is-undefined"

export type CollectionItem = {
    key: string
}

export interface Collection<I extends CollectionItem> {
    load: () => I[],
    find: (propertyName: keyof I, value: any) => I | null,
    findAll: (propertyName: keyof I, value: any) => I[],
    update: (item: I) => Promise<void>,
    remove: (document: I) => Promise<void>,
    set: (documents: I[]) => Promise<I[]>
    add: (document: I) => Promise<I>
}

export const createCollection  = <T extends CollectionItem> (collectionName: string): Collection<T> => {
    const getStorage = async () => {
        const storage = await storageManager.get(collectionName)
        if(isUndefined(storage.data)){
            storage.init({ documents: [] })
        }
        return storage
    }
    class ResponseClass<T extends CollectionItem> implements Collection<T> {

        private documents: T[] = []

        constructor(){ this.loadFromStorage() }

        public async add(document: T){
            const noSymbolDocument = JSON.parse(JSON.stringify(document))
            this.documents.push(noSymbolDocument)
            this.set(this.documents)
            return document
        }
        public async remove(document: T){
            await this.set(this.documents.filter(doc => doc.key != document.key))
        }
        public find(propertyName: keyof T, value: any) {
            for (const document of this.documents as any) {
                if(document[propertyName] == value){
                    return document
                }
            }
            return null
        }
        public findAll(propertyName: keyof T, value: any) {
            const response: T[] = []
            for (const document of this.documents as any) {
                if(document[propertyName] == value){
                    response.push(document)
                }
            }
            return response
        }
        public async update(item: T){
            if(isUndefined(item.key)) return
            for (let index = 0; index < this.documents.length; index++) {
                if(this.documents[index].key == item.key){
                    this.documents[index] = item
                    break
                }
            }
            await this.set(this.documents)
        }

        public async set(documents: T[]){
            const storage = await getStorage()
            this.documents = documents
            storage.init({ documents })
            storage.close()
            return documents
        }

        public load(){
            if(this.documents.length==0) return []
            return JSON.parse(JSON.stringify(this.documents))
        }

        private async loadFromStorage(){
            const storage = await getStorage()
            this.documents = [ ...storage.data.documents ]
            storage.close()
        }
    }

    return new ResponseClass()
}