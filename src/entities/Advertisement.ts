import { Sponser, SPONSERS } from './Sponser'

class Advertisement {
    private readonly sponsers: Sponser[] = SPONSERS
    public getOne = (): Sponser => {
        const random = Math.floor(Math.random() * this.sponsers.length)
        return this.sponsers[random]
    }
}
