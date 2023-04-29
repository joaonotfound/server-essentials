import { CommandOrigin } from "bdsx/bds/commandorigin"
import { ServerPlayer } from "bdsx/bds/player"
import { Storage, storageManager } from "bdsx/storage"

type Callback = (storage: Storage) => any

export const openStorageFromOrigin = async (origin: CommandOrigin, callback: Callback) => {
    if(origin.getEntity() == null) return
    const storage = await storageManager.get(origin.getEntity() as ServerPlayer)
    if(!storage.isLoaded) return
    await callback(storage)
    storage.close()
}