import { INIT_PAGE } from '../../../constants/qa/page'
import { QuestionType } from '../../../constants/qa/status'
import { QuestionQuery } from '../../../constants/query'

export const initQuestionQuery: QuestionQuery = {
    status: QuestionType.NOT_SOLVED,
    orderBy: 'createdAt',
    direction: 'desc',
    categories: [],
    page: INIT_PAGE,
}
