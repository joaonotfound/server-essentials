import { Actor } from "bdsx/bds/actor";
import { CommandPermissionLevel } from "bdsx/bds/command";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { command } from "bdsx/command";
import { CollectionItem } from "./create-collection";
import { CRUD } from "./create-crud";
import { isUndefined } from "./is-undefined";

const ensurePlayer = (actor: Actor | null, calback: any ) => {
    const ni = actor?.getNetworkIdentifier()
    if(isUndefined(actor, ni)) return
    calback(ni)
}

export const createCommands = <T extends CollectionItem> (commandSuffix: string, crud: CRUD<T>) => {
    console.log('registrando comando ' + commandSuffix)
    command.register(`create-${commandSuffix}`, `create ${commandSuffix}`, CommandPermissionLevel.Operator)
        .overload((_, origin, _2) => {
            ensurePlayer(origin.getEntity(),
                (ni: NetworkIdentifier) => crud.create(ni))
        },
    {})

    command.register(`edit-${commandSuffix}`, `edit ${commandSuffix}`, CommandPermissionLevel.Operator)
    .overload((_, origin, _2) => {
        ensurePlayer(origin.getEntity(),
            (ni: NetworkIdentifier) => crud.update(ni))
        },
    {})

    command.register(`remove-${commandSuffix}`, `remove ${commandSuffix}`, CommandPermissionLevel.Operator)
    .overload((_, origin, _2) => {
        ensurePlayer(origin.getEntity(),
            (ni: NetworkIdentifier) => crud.remove(ni))
    }, {})

}