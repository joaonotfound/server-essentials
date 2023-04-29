
import './sell-item'
import './ban-item'
import './shop'
import './edit-shop-item'
import './delete-shop-item'
import './sell'
import './add-prof-item'
import './delete-profitable-item'
import './edit-profitable-items'
import './rank-up'
import './menu'
import './teleports'
import './reset'
import './info'
import './home'

import { announce, createCommands } from '../../utils'
import { categoryCRUD } from '../utils/category-crud'
import { plotCrud } from '../utils/plots-crud'
import { events } from 'bdsx/event'
import { particleCrud } from '../utils/particle-crud'
import { minesCrud } from '../utils/mine-crud'
import { NpcTeleportCrud } from '../utils/npc-teleport-crud'
import { settingCrud } from '../utils/setting-crud'
import { menuCrud } from '../utils/menu-crud'

events.playerJoin.on(async ({ player }) => {
    announce(player, `§eWelcome! §r${player.getNameTag()}`, true)
})

createCommands('category', categoryCRUD)
createCommands('plot', plotCrud)
createCommands('particle', particleCrud)
createCommands('mine', minesCrud)
createCommands('npc-teleport', NpcTeleportCrud)
createCommands('setting', settingCrud)
createCommands('menu', menuCrud)