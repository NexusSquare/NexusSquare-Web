export const LINKS = {
    HOME: '/',
    PROFILE: (id: string) => `/profile/${id}`,
    REGISTER: {
        STEP1: '/register/step1',
        STEP2: '/register/step2',
        STEP3: '/register/step3',
    },
    LOGIN: '/login',
    QUESTION: '/qa',
    QUESTION_DETAIL: (id: string) => `/qa/${id}`,
    RULE: '/rule',
    PRIVACY: 'privacy',
} as const
