import { Player, ServerPlayer } from "bdsx/bds/player";
import { PermissionLevel } from "../environment";

export function isOperator(player: Player){
    return player.getCommandPermissionLevel() as number == PermissionLevel.OPERATOR
}