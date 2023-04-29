import { Block } from "bdsx/bds/block";
import { environment } from "../environment";


export const isGoldenBlock = (block: Block) => {
    return block.getName() == environment.golden_block
}