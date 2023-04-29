import { events } from "bdsx/event"

export const createEvent = (callback: any, time: number) => {
    const interval = setInterval(callback, time)
    events.serverStop.on(() => {
        clearInterval(interval)
    })
}