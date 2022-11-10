export const STATUS = {
    SOLVED: 'SOLVED',
    NOT_SOLVED: 'NOT_SOLVED',
} as const

export type QuestionStatus = keyof typeof STATUS
