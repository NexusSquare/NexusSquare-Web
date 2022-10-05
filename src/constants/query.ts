export const QUERY_KEYS = {
    USER: (uid?: string | null) => uid,
    MY_USER: 'user',
    USER_META: 'userMeta',
    QUESTION: (questionId?: string) => questionId,
    QUESTIONS: 'questions',
    ANSWERS: 'answers',
    HISTORIES: 'histories',
} as const