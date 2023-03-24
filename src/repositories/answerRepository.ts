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
import { db } from '../plugins/firebase/client'
import { Answer } from '../entities/qa/Answer'
import { AnswerRes } from '../api/res/AnswerRes'

export class AnswerRepository {
    public findByQuestionId = async (questionId: string): Promise<AnswerRes[]> => {
        console.log('answer by questionId fetch')
        const answerCol = collection(db, 'answers')
        const answerQuery = query(answerCol, where('questionId', '==', questionId), orderBy('createdAt', 'desc'))
        const snapShot = await getDocs(answerQuery)
        return snapShot.docs.map((doc) => {
            return { document: doc.data(), documentId: doc.id } as AnswerRes
        })
    }
    public findByUserId = async (userId: string): Promise<AnswerRes[]> => {
        console.log('answer by userId fetch')
        const answerCol = collection(db, 'answers')
        const answerQuery = query(answerCol, where('userId', '==', userId), orderBy('createdAt', 'desc'))
        const snapShot = await getDocs(answerQuery)
        return snapShot.docs.map((doc) => {
            return { document: doc.data(), documentId: doc.id } as AnswerRes
        })
    }
    // NOTE answerにIDが含まれていないため、Omitを使用
    public save = async (answer: Omit<Answer, 'answerId'>): Promise<void> => {
        const answerCol = collection(db, 'answers')
        addDoc(answerCol, answer)
    }
    public update = async (answer: Partial<Answer>, answerId: string): Promise<void> => {
        const answerDoc = doc(db, 'answers', answerId)
        updateDoc(answerDoc, answer)
    }
    public delete = async (answerId: string): Promise<void> => {
        const answerDoc = doc(db, 'answers', answerId)
        deleteDoc(answerDoc)
    }
}

export const answerRepository = new AnswerRepository()
