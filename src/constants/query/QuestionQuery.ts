import { STATUS } from '../qa/status'
import QACategories, { QA_STUDENT_LIFE_CATEGORIES, QA_SUBJECT_CATEGORIES } from '../qa/qaCategories'
import { Question } from '../../entities/qa'

export type Status = keyof typeof STATUS

type QASubjectCategoriesType = keyof typeof QA_SUBJECT_CATEGORIES
type QAStudentLifeCategoriesType = keyof typeof QA_STUDENT_LIFE_CATEGORIES
export type QACategory = QASubjectCategoriesType | QAStudentLifeCategoriesType

export type OrderBy = 'createdAt' | 'updatedAt' | 'ansNum'
export type Direction = 'desc' | 'asc'

export type QuestionQuery = {
    status: Status
    orderBy: OrderBy
    lastQuestion?: Question
    direction: Direction
    categories: QACategory[]
    title?: string
    page: number
}
