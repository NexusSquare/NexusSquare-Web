import { Sponser, SPONSERS } from './Sponser'

class Advertisement {
    private readonly sponsers: Sponser[] = SPONSERS
    public getOne = (): Sponser => {
        const random = Math.floor(Math.random() * this.sponsers.length)
        return this.sponsers[random]
    }

    public getAll = (): Sponser[] => {
        return this.sponsers
    }

    public getSome = (count: number): Sponser[] => {
        const randoms: number[] = []
        const result: Sponser[] = []
        while (randoms.length < count) {
            const random = Math.floor(Math.random() * this.sponsers.length)
            if (!randoms.includes(random)) {
                randoms.push(random)
                result.push(this.sponsers[random])
            }
        }
        return result
    }
}
