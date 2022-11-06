import { STATUS } from '../qa/status'
import QACategories from '../qa/qaCategories'
import { Question } from '../../types/domain/qa'

type Status = keyof typeof STATUS
type QACategoriesType = typeof QACategories
type QACategories = typeof QACategories[keyof QACategoriesType]

export type QuestionQuery = {
    status: Status
    orderBy: 'createAt' | 'updateAt' | 'ansNum'
    lastQuestion?: Question
    direction: 'desc' | 'asc'
    categories?: QACategories[]
}
