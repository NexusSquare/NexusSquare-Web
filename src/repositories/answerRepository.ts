import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../plugins/firebase'
import { Answer } from '../types/domain/qa/Answer'

export const answerRepository = {
    async find(): Promise<Answer[]> {
        const answerCol = collection(db, 'answers')
        const snapShot = await getDocs(answerCol)
        return snapShot.docs.map((doc) => {
            return { ...doc.data(), answerId: doc.id } as Answer
        })
    },
    async findById(answerId: string): Promise<Answer> {
        const answerRef = doc(db, `answers/${answerId}`)
        const res = await getDoc(answerRef)
        const answer = { ...res.data(), answerId: res.id } as Answer
        return answer
    },
    // NOTE answerにIDが含まれていないため、Omitを使用
    async save(answer: Omit<Answer, 'answerId'>): Promise<void> {
        const answerCol = collection(db, 'answers')
        addDoc(answerCol, answer)
    },
    async update(answer: Partial<Answer>, answerId: string): Promise<void> {
        const answerDoc = doc(db, 'answers', answerId)
        updateDoc(answerDoc, answer)
    },
    async delete(answerId: string): Promise<void> {
        const answerDoc = doc(db, 'answers', answerId)
        deleteDoc(answerDoc)
    },
}
