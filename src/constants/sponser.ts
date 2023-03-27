// export const SPONSERS = [
//     {
//         name: 'mapquest',
//         url: 'https://www.sponser1.com',
//         image: {
//             banner: '/images/sponser/banners/mapquest.png',
//             logo: '/images/sponser/logos/mapquest.png',
//         },
//     },
//     {
//         name: 'shinnichi',
//         url: 'https://www.sponser2.com',
//         image: {
//             banner: '/images/sponser/banners/shinnichi.png',
//             logo: '/images/sponser/logos/shinnichi.png',
//         },
//     },
//     {
//         name: 'tasuki',
//         url: 'https://www.sponser2.com',
//         image: {
//             banner: '/images/sponser/banners/tasuki.png',
//             logo: '/images/sponser/logos/tasuki.png',
//         },
//     },
// ] as const
export const SPONSERS = {
    mapquest: {
        name: 'mapquest',
        url: 'https://www.sponser1.com',
        image: {
            banner: '/images/sponser/banners/mapquest.png',
            logo: '/images/sponser/logos/mapquest.png',
        },
    },
    shinnichi: {
        name: 'shinnichi',
        url: 'https://www.sponser2.com',
        image: {
            banner: '/images/sponser/banners/shinnichi.png',
            logo: '/images/sponser/logos/shinnichi.png',
        },
    },
    tasuki: {
        name: 'tasuki',
        url: 'https://www.sponser2.com',
        image: {
            banner: '/images/sponser/banners/tasuki.png',
            logo: '/images/sponser/logos/tasuki.png',
        },
    },
} as const

export type Sponser = {
    name: string
    url: string
    image: {
        banner: string
        logo: string
    }
}
