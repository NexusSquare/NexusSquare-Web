export type Sponser = {
    name: string
    url: string
    image: {
        banner: string
        logo: string
        rate?: number
    }
}

export const SPONSERS: Sponser[] = [
    {
        name: 'mapquest',
        url: 'https://www.sponser1.com',
        image: {
            banner: '/images/sponser/banners/mapquest.png',
            logo: '/images/sponser/logos/mapquest.png',
        },
    },
    {
        name: 'shinnichi',
        url: 'https://www.sponser2.com',
        image: {
            banner: '/images/sponser/banners/shinnichi.png',
            logo: '/images/sponser/logos/shinnichi.png',
            rate: 0.7,
        },
    },
    {
        name: 'tasuki',
        url: 'https://www.sponser2.com',
        image: {
            banner: '/images/sponser/banners/tasuki.png',
            logo: '/images/sponser/logos/tasuki.png',
        },
    },
]
