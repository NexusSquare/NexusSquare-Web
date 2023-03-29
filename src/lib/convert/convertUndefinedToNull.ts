export const convertUndefinedToNull = (obj: any) => {
    for (let prop in obj) {
        if (obj[prop] === undefined) {
            obj[prop] = null
        } else if (typeof obj[prop] === 'object') {
            convertUndefinedToNull(obj[prop])
        }
    }
    return obj
}
