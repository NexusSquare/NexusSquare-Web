import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    QueryConstraint,
    startAfter,
    updateDoc,
    where,
} from 'firebase/firestore'
import { bigram } from 'n-gram'
import { STATUS } from '../constants/qa/status'
import { QuestionQuery } from '../constants/query'
import { db } from '../plugins/firebase/client'
import { Question } from '../types/domain/qa/Question'

export const questionRepository = {
    async find(queryQuestion: QuestionQuery): Promise<Question[]> {
        console.log('question fetch')
        const questionCol = collection(db, 'questions')
        const queryArgs = createQueryArgs(queryQuestion)
        const questionRef = query(questionCol, ...queryArgs, limit(5))
        const snapShot = await getDocs(questionRef)
        return snapShot.docs.map((doc) => {
            return { ...doc.data(), questionId: doc.id } as Question
        })
    },
    // NOTE:Firebaseの設計上タイトル検索を分ける必要がある
    async findByTitle(title: string): Promise<Question[]> {
        const grams: string[] = bigram(title)
        const questionCol = collection(db, 'questions')
        const queryArgs = createTitleIndex(grams)
        const questionQuery = query(questionCol, ...queryArgs, where('status', '==', 'NOT_SOLVED'), limit(5))
        const snapShot = await getDocs(questionQuery)
        return snapShot.docs.map((doc) => {
            return { ...doc.data(), questionId: doc.id } as Question
        })
    },
    async findById(questionId: string): Promise<Question> {
        console.log('question by id fetch')
        const questionRef = doc(db, `questions/${questionId}`)
        const res = await getDoc(questionRef)
        const question = { ...res.data(), questionId: res.id } as Question
        return question
    },
    async findByUserId(userId: string): Promise<Question[]> {
        console.log('question by userId fetch')
        const questionCol = collection(db, 'questions')
        const questionQuery = query(questionCol, where('userId', '==', userId), orderBy('createAt', 'desc'))
        const snapShot = await getDocs(questionQuery)
        return snapShot.docs.map((doc) => {
            return { ...doc.data(), questionId: doc.id } as Question
        })
    },
    // NOTE QuestionにIDが含まれていないため、Omitを使用
    async save(question: Omit<Question, 'questionId'>): Promise<void> {
        console.log(question)
        const questionCol = collection(db, 'questions')
        addDoc(questionCol, question)
    },
    async update(question: Partial<Question>, questionId: string): Promise<void> {
        const questionDoc = doc(db, 'questions', questionId)
        updateDoc(questionDoc, question)
    },
    async delete(questionId: string): Promise<void> {
        const questionDoc = doc(db, 'questions', questionId)
        deleteDoc(questionDoc)
    },
} as const

const createQueryArgs = (query: QuestionQuery): QueryConstraint[] => {
    let args: QueryConstraint[] = []
    args.push(orderBy(query.orderBy, query.direction))
    args.push(where('status', '==', query.status))
    if (query.categories) args.push(where('categories', 'array-contains-any', query.categories))
    return args
}

// NOTE: n-gramsでタイトル検索を実現
const createTitleIndex = (grams: string[]): QueryConstraint[] => {
    let args: QueryConstraint[] = []
    grams.forEach((gram) => {
        args.push(where(`biGram.${gram}`, '==', true))
    })
    return args
}
