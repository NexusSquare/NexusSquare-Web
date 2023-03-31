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
import { db } from '../../plugins/firebase/client'
import { Answer } from '../../entities/qa/Answer'
import { answerConverter } from './AnswerConverter'
import { AnswerRepository } from './AnswerRepository'

export class AnswerRepositoryImpl implements AnswerRepository {
    private answerCol = collection(db, 'answers').withConverter(answerConverter)
    public findByQuestionId = async (questionId: string): Promise<Answer[]> => {
        const answerQuery = query(this.answerCol, where('questionId', '==', questionId), orderBy('createdAt', 'desc'))
        const snapShot = await getDocs(answerQuery)
        return snapShot.docs.map((doc) => {
            return doc.data()
        })
    }
    public findByUserId = async (userId: string): Promise<Answer[]> => {
        const answerQuery = query(this.answerCol, where('userId', '==', userId), orderBy('createdAt', 'desc'))
        const snapShot = await getDocs(answerQuery)
        return snapShot.docs.map((doc) => {
            return doc.data()
        })
    }

    public save = async (answer: Answer): Promise<void> => {
        addDoc(this.answerCol, answer)
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

export const answerRepository = new AnswerRepositoryImpl()
