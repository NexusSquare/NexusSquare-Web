export const QUERY_KEYS = {
    USER: (uid?: string | null) => uid,
    MY_USER: 'user',
    USER_META: 'userMeta',
    QUESTION: (questionId?: string) => questionId,
    QUESTIONS: 'questions',
    ANSWERS: (id?: string) => `answers/${id}`,
    HISTORIES: 'histories',
} as const
