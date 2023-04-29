import { storageManager } from "bdsx/storage"
import { isUndefined } from "./is-undefined"

type coordinates = { x: number, y: number, z: number, }

export type PlayerStorage = {
    money: number,
    rank: number,
    first_join: boolean,
    home?: string,
    we_pos1: coordinates,
    we_pos2: coordinates,
    we_pos_toggle: 1 | -1
}

export const openPlayerStorage = async (player: any): Promise<PlayerStorage> => {
    const storage = await storageManager.get(player)
    if(isUndefined(storage.data)){
        storage.init({ money: 0, rank: 0 })
    }
    const response = JSON.parse(JSON.stringify(storage.data))
    storage.close()
    return response
}

export const savePlayerStorage = async (player: any, content: PlayerStorage | undefined) => {
    const storage = await storageManager.get(player)
    storage.init(content)
    storage.close()
}