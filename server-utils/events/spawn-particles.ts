import { particleCollection } from "../utils/particles-collection";
import { bedrockServer } from "bdsx/launcher";

setInterval(() => {
    const particle = particleCollection.load()
    particle.map(particle => bedrockServer.executeCommand(`particle ${particle.command_name} ${particle.x} ${particle.y} ${particle.z}`))
}, 2500);