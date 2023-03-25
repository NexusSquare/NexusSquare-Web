import {
    or,
    orderBy as documentOrderBy,
    limit,
    where,
    QueryCompositeFilterConstraint,
    and,
    Query,
    query,
    QueryFilterConstraint,
} from 'firebase/firestore'
import { bigram } from 'n-gram'
import { PAGE_SIZE } from '../../constants/qa/page'
import { QuestionQuery } from '../../constants/query/QuestionQuery'
import { QuestionStatus } from '../../entities/qa/QuestionStatus'

export class QuestionQueryBuilder<T> {
    private pageSize = PAGE_SIZE
    private query: QuestionQuery
    private ref: Query<T>

    constructor(query: QuestionQuery, ref: Query<T>) {
        this.query = query
        this.ref = ref
    }

    build(): Query<T> {
        const { status, orderBy, direction, categories, page } = this.query
        const compositeFilter = this.createCompositeFilter(categories, status)
        return query(this.ref, compositeFilter, documentOrderBy(orderBy, direction), limit(this.pageSize * page))
    }

    buildForTitle(): Query<T> {
        const { title, status, categories } = this.query
        const compositeFilter = this.createCompositeFilter(categories, status, title)
        return query(this.ref, compositeFilter)
    }

    private createCompositeFilter = (
        categories: string[],
        status: string,
        title?: string
    ): QueryCompositeFilterConstraint => {
        const queryConstraints: QueryFilterConstraint[] = []
        if (categories.length !== 0) queryConstraints.push(where('categories', 'array-contains-any', categories))
        if (status === QuestionStatus.SOLVED) queryConstraints.push(where('status', '==', QuestionStatus.SOLVED))
        else
            queryConstraints.push(
                or(where('status', '==', QuestionStatus.OPEN), where('status', '==', QuestionStatus.EXTENDED))
            )
        if (title) queryConstraints.push(...this.createTitleIndex(bigram(title)))
        return and(...queryConstraints)
    }

    private createTitleIndex = (grams: string[]): QueryFilterConstraint[] => {
        const queryFieldFilterConstraint = grams.map((gram) => {
            return where(`biGram.${gram}`, '==', true)
        })
        return queryFieldFilterConstraint
    }
}
