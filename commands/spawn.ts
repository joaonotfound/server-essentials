import { command } from "bdsx/command";
import { isUndefined } from "../utils";
import { bedrockServer } from "bdsx/launcher";
import { settingsCollection } from "../server-utils/utils/settings-collection";

command.register('spawn', 'teleport to spawn')
    .overload((params, origin, output) => {

        const player = origin.getEntity()
        const tagname = player?.getNameTag()
        const spawnLocation = settingsCollection.find('name', 'spawn-location')?.value
        if(isUndefined(tagname, spawnLocation)) return

        bedrockServer.executeCommand(`tp "${tagname}" ${spawnLocation}`)
    }, {})
