export const catcher = <T>(func: Promise<T>): Promise<T | 'error'> => {
    return func
        .then((value) => {
            return value
        })
        .catch(() => {
            return 'error'
        })
}
