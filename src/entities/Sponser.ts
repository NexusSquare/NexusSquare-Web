export type Sponser = {
    name: string

    image: {
        banner: string
        logo: string
        rate?: number
    }
    urls: {
        banner: string
        logo: string
    }
}

export const SPONSERS: Sponser[] = [
    {
        name: 'mapquest',
        image: {
            banner: '/images/sponser/banners/mapquest.png',
            logo: '/images/sponser/logos/mapquest.png',
        },
        urls: {
            banner: 'https://www.mapquest.co.jp',
            logo: 'https://www.mapquest.co.jp',
        },
    },
    {
        name: 'shinnichi',

        image: {
            banner: '/images/sponser/banners/shinnichi.png',
            logo: '/images/sponser/logos/shinnichi.png',
            rate: 0.7,
        },
        urls: {
            banner: 'https://www.shinnichikogyo.co.jp',
            logo: 'https://www.shinnichikogyo.co.jp',
        },
    },
    {
        name: 'tasuki',
        image: {
            banner: '/images/sponser/banners/tasuki.png',
            logo: '/images/sponser/logos/tasuki.png',
        },
        urls: {
            banner: 'https://info.tasuki-inc.com',
            logo: 'https://mog-job.com',
        },
    },
    {
        name: 'hekikai',
        image: {
            banner: '/images/sponser/banners/hekikai.png',
            logo: '/images/sponser/logos/hekikai.png',
        },
        urls: {
            banner: 'https://www.hekishin.jp',
            logo: 'https://www.hekishin.jp/',
        },
    },
]
