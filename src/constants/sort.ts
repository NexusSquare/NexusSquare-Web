import { Direction, OrderBy } from './query'

export type SortItem = {
    value: string
    orderBy: OrderBy
    direction: Direction
}
export const SORT: SortItem[] = [
    { value: '新着順（デフォルト）', orderBy: 'createdAt', direction: 'desc' },
    { value: '古い順', orderBy: 'createdAt', direction: 'asc' },
    { value: '更新日が新しい順', orderBy: 'updatedAt', direction: 'desc' },
    { value: '更新日が古い順', orderBy: 'updatedAt', direction: 'asc' },
    { value: '回答数が多い順', orderBy: 'ansNum', direction: 'desc' },
    { value: '回答数が少ない順', orderBy: 'ansNum', direction: 'asc' },
]
