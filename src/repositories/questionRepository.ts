import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
} from 'firebase/firestore'
import { STATUS } from '../constants/qa/status'
import { QuestionQuery } from '../constants/query'
import { db } from '../plugins/firebase'
import { Question } from '../types/domain/qa/Question'

export const questionRepository = {
    async find(queryQuestion: QuestionQuery): Promise<Question[]> {
        console.log('question fetch')
        const questionCol = collection(db, 'questions')
        const questionQuery = query(
            questionCol,
            where('status', '==', queryQuestion?.status),
            orderBy(queryQuestion?.orderBy, 'desc')
        )
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
