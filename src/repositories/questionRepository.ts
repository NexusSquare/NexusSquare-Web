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
import { db } from '../plugins/firebase'
import { Question } from '../types/domain/qa/Question'

export const questionRepository = {
    async find(): Promise<Question[]> {
        const questionCol = collection(db, 'questions')
        const snapShot = await getDocs(questionCol)
        return snapShot.docs.map((doc) => {
            return { ...doc.data(), questionId: doc.id } as Question
        })
    },
    async findById(questionId: string): Promise<Question> {
        const questionRef = doc(db, `questions/${questionId}`)
        const res = await getDoc(questionRef)
        const question = { ...res.data(), questionId: res.id } as Question
        return question
    },
    async findByUserId(userId: string): Promise<Question[]> {
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
}
