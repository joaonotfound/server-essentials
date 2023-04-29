import { events } from "bdsx/event";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { connectionList } from "./connection-list";

events.packetAfter(MinecraftPacketIds.Login).on((ptr, networkIdentifier, packetId) => {
    const ip = networkIdentifier.getAddress();
    const connreq = ptr.connreq;
    if (connreq === null) return; // wrong client
    const cert = connreq.getCertificate();
    if (cert === null) return; // wrong client ?
    const username = cert.getId();

    if (username) connectionList.set(networkIdentifier, username);
});

events.networkDisconnected.on(ni => { connectionList.delete(ni)})