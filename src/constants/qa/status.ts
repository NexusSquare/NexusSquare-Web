export const QuestionType = {
    SOLVED: 'SOLVED',
    NOT_SOLVED: 'NOT_SOLVED',
} as const

export type QuestionType = keyof typeof QuestionType
