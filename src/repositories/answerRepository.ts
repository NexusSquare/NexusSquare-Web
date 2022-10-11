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
import { Answer } from '../types/domain/qa/Answer'

export const answerRepository = {
    async findByQuestionId(questionId: string): Promise<Answer[]> {
        const answerCol = collection(db, 'answers')
        const answerQuery = query(answerCol, where('questionId', '==', questionId), orderBy('createAt', 'desc'))
        const snapShot = await getDocs(answerQuery)
        return snapShot.docs.map((doc) => {
            return { ...doc.data(), answerId: doc.id } as Answer
        })
    },
    async findByUserId(userId: string): Promise<Answer[]> {
        const answerCol = collection(db, 'answers')
        const answerQuery = query(answerCol, where('userId', '==', userId), orderBy('createAt', 'desc'))
        const snapShot = await getDocs(answerQuery)
        return snapShot.docs.map((doc) => {
            return { ...doc.data(), answerId: doc.id } as Answer
        })
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
