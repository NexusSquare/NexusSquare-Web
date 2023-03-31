export const generateRandomIndexNumber = (len: number) => {
    return Math.floor(Math.random() * len)
}

export const generateRandomIndexNumberList = (len: number, count: number) => {
    const randoms: number[] = []
    while (randoms.length < count) {
        const random = generateRandomIndexNumber(len)
        if (!randoms.includes(random)) {
            randoms.push(random)
        }
    }
    return randoms
}
