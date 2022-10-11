export const QUERY_KEYS = {
    USER: (uid?: string | null) => uid,
    MY_USER: 'user',
    USER_META: 'userMeta',
    QUESTION: (id?: string) => `questions/${id}`,
    QUESTIONS: 'questions',
    ANSWER: (id?: string) => `answers/${id}`,
    HISTORIES: 'histories',
} as const
