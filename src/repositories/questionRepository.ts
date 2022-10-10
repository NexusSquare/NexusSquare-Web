import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
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
    // NOTE QuestionにIDが含まれていないため、Omitを使用
    async save(question: Omit<Question, 'questionId'>): Promise<void> {
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
