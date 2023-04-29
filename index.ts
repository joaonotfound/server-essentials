
import { events } from "bdsx/event";
import { bedrockServer } from 'bdsx/launcher'

console.log('[plugin:ServerEssentials] allocated');

events.serverOpen.on(() => {
    console.log('[plugin:ServerEssentials] launching');
    require('./commands')
    require('./world-edit')
    require('./server-utils')
    require('./utils/register-player-when-connecting')
    events.itemUse.on(event => {
        const itemName = event.itemStack.getName()
        if (itemName == 'minecraft:ender_pearl') {
            const command = `execute as "${event.player.getNameTag()}" run menu`
            bedrockServer.executeCommand(command)
        }
    })
});

events.serverClose.on(() => {
    console.log('[plugin:ServerEssentials] closed');
});