export const PAGE_LINKS = {
    HOME: { URL: '/' },
    PROFILE: { _USER_ID: (id: string) => ({ URL: `/profile/${id}` }) },
    REGISTER: {
        STEP1: { URL: '/register/step1' },
        STEP2: { URL: '/register/step2' },
        STEP3: { URL: '/register/step3' },
    },
    LOGIN: { URL: '/login' },
    QA: {
        URL: '/qa',
        _QUESTIONS_ID: (id: string) => ({ URL: `/qa/${id}` }),
        POST: { URL: `/qa/post` },
        RESULT: { URL: `/qa/result` },
    },
    RULE: { URL: '/rule' },
    PRIVACY: { URL: '/privacy' },
} as const
