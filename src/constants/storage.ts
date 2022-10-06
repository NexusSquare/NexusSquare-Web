export const STORAGE_URL = {
    USERS: (id: string) => `users/${id}`,
    QUESTIONS: (id: string) => `questions/${id}`,
    ANSWERS: (id: string) => `answers/${id}`,
} as const
