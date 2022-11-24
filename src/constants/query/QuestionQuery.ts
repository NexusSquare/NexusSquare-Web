import { STATUS } from '../qa/status'
import QACategories from '../qa/qaCategories'
import { Question } from '../../entities/qa'

type Status = keyof typeof STATUS
type QACategoriesType = typeof QACategories

export type QACategory = typeof QACategories[keyof QACategoriesType]

export type OrderBy = 'createAt' | 'updateAt' | 'ansNum'
export type Direction = 'desc' | 'asc'

export type QuestionQuery = {
    status: Status
    orderBy: OrderBy
    lastQuestion?: Question
    direction: Direction
    categories: QACategory[]
    title?: string
}
