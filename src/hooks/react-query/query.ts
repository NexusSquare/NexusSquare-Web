export const QUERY_KEYS = {
    USER: (uid?: string | null) => uid,
    MY_USER: 'user',
    USER_META: (uid?: string | null) => `${uid}-userMeta`,
    QUESTION: (id: string) => `questions/${id}`,
    QUESTIONS: 'questions',
    NOTIFICATIONS: 'notifications',
    ANSWER: (id: string) => `answers/${id}`,
    HISTORIES: (uid: string) => `histories/${uid}`,
} as const
