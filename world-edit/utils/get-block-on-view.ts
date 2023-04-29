import { Player } from "bdsx/bds/player"
import { BlockPos } from "bdsx/bds/blockpos"
import { Block } from "bdsx/bds/block"

export const getBlockOnView = (player: Player, distance: number): { position: BlockPos, block: Block } | null => {
    const position = player.getPosition()
    const viewVector = player.getViewVector()
    const blockpos = BlockPos.create(position.x + viewVector.x * distance, position.y + viewVector.y * distance, position.z + viewVector.z * distance)
    const block = player.getRegion().getBlock(blockpos)
    if(block.getDescriptionId() == 'tile.air') return null
    return { position: blockpos, block: block }
}
