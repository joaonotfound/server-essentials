

export const isUndefined = (...args: any) => {
    for (const item of args) {
        if(item == undefined || item == null){
            return  true
        }
    }
}