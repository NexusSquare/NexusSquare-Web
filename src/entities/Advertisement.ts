import { generateRandomIndexNumber, generateRandomIndexNumberList } from '../lib/generators/generateRandomIndexNumber'
import { Sponser, SPONSERS } from './Sponser'

class Advertisement {
    private readonly sponsers: Sponser[] = SPONSERS
    public getOne = (): Sponser => {
        const random = generateRandomIndexNumber(this.sponsers.length)
        return this.sponsers[random]
    }

    public getAll = (): Sponser[] => {
        return this.sponsers
    }

    public getSome = (count: number): Sponser[] => {
        const randoms = generateRandomIndexNumberList(this.sponsers.length, count)
        return randoms.map((random) => this.sponsers[random])
    }
}

export const advertisement = new Advertisement()
