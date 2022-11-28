import { Direction, OrderBy } from './query'

export type SortItem = {
    value: string
    orderBy: OrderBy
    direction: Direction
}
export const SORT: SortItem[] = [
    { value: '新着順（デフォルト）', orderBy: 'createAt', direction: 'desc' },
    { value: '古い順', orderBy: 'createAt', direction: 'asc' },
    { value: '更新日が新しい順', orderBy: 'updateAt', direction: 'desc' },
    { value: '更新日が古い順', orderBy: 'updateAt', direction: 'asc' },
    { value: '回答数が多い順', orderBy: 'ansNum', direction: 'desc' },
    { value: '回答数が少ない順', orderBy: 'ansNum', direction: 'asc' },
]
