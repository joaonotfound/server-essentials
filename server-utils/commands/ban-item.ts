import { CommandPermissionLevel } from "bdsx/bds/command";
import {  Form, FormItem, } from "bdsx/bds/form";
import { ServerPlayer } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { CxxString } from "bdsx/nativetype";
import { BannedItem, bannedItemsCollection } from "../utils/banned-items-storage";
import { announce } from "../../utils";
import { isUndefined } from "../../utils/is-undefined";
import { v4 } from 'uuid'

command.register('banitemform', 'open form of banned items', CommandPermissionLevel.Operator).overload(
    async (params, origin, output) => {
        const player = origin.getEntity() as ServerPlayer
        const ni = player.getNetworkIdentifier()
        if(isUndefined(player)) return

        const items = bannedItemsCollection.load() //: any = Object.keys(bannedItemsCollection.getItems())
        const response = await Form.sendTo(ni, {
            type: 'custom_form',
            title: 'Itens banidos',
            content: [
                ...items.map(item => ({ type: 'toggle', text: item.itemName, default: item.banned })) as FormItem[]
            ]
        })
        if(isUndefined(response)) return
        for(let index = 0; index<items.length; index++){
            items[index]['banned'] = response![index]
        }
        await bannedItemsCollection.set(items)
    }, {}
)

command.register('listbanitems', 'list the banned items', CommandPermissionLevel.Operator).overload(
    async (params, origin, output) => {
        const player = origin.getEntity() as ServerPlayer
        if(isUndefined(origin.getEntity())) return

        const items = bannedItemsCollection.load()

        announce(player, 'listando items banidos...')
        for (const item of items) {
            announce(player, item.itemName)
        }
    }, {}
)

command.register('banitem', 'ban an item from the server', CommandPermissionLevel.Operator).overload(
    async (params, origin, output) => {
        const player = origin.getEntity() as ServerPlayer
        bannedItemsCollection.add({ key: v4(), itemName: params.item, banned: true })
        announce(player, 'item adicionado com sucesso.')

        }, {
        item: CxxString
})
