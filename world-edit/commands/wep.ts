import { command  } from "bdsx/command"
import { announce, isOperator, openPlayerStorage, savePlayerStorage } from "../../utils"
import { ServerPlayer } from "bdsx/bds/player"
import { CommandPermissionLevel } from "bdsx/bds/command"

command.register('wep1', 'set position 1', CommandPermissionLevel.Operator).overload(async (params, origin, output) => {
    const player = origin.getEntity() as ServerPlayer
    const storage = await openPlayerStorage(player)

    const vec3 = player.getPosition()
    const pos = { x: vec3.x, y: vec3.y-1, z: vec3.z }
    storage.we_pos1 = pos

    await savePlayerStorage(player, storage)
    announce(player, `position 1 defined ${pos.x} ${pos.y} ${pos.z}`)
}, {})

command.register('wep2', 'set position 2', CommandPermissionLevel.Operator).overload(async (params, origin, output) => {
    const player = origin.getEntity() as ServerPlayer
    const storage = await openPlayerStorage(player)

    const vec3 = player.getPosition()
    const pos = { x: vec3.x, y: vec3.y-1, z: vec3.z }
    storage.we_pos2 = pos

    await savePlayerStorage(player, storage)
    announce(player, `position 2 defined ${pos.x} ${pos.y} ${pos.z}`)
}, {})