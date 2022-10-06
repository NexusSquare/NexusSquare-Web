import { addDoc, collection } from 'firebase/firestore'
import { db } from '../plugins/firebase'
import { Question } from '../types/domain/qa/Question'

export const questionRepository = {
    async save(user: Question): Promise<void> {
        const userRef = collection(db, 'questions')
        addDoc(userRef, user)
    },
}
