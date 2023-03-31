import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    or,
    orderBy,
    query,
    QueryConstraint,
    updateDoc,
    where,
} from 'firebase/firestore'
import { QuestionQuery } from '../../constants/query'
import { db } from '../../plugins/firebase/client'
import { Question } from '../../entities/qa/Question'
import { QuestionRepository } from './QuestionRepository'
import { QuestionConverter } from './QuestionConverter'
import { QuestionQueryBuilder } from './QueryBuilder'
import { convertUndefinedToNull } from '../../lib/convert/convertUndefinedToNull'

class QuestionRepositoryImpl implements QuestionRepository {
    private questionCol = collection(db, 'questions').withConverter(QuestionConverter)

    public async findAll(queryQuestion: QuestionQuery): Promise<Question[]> {
        console.log('question fetch')
        const query = new QuestionQueryBuilder(queryQuestion, this.questionCol).build()
        const snapShot = await getDocs(query)
        return snapShot.docs.map((doc) => {
            return doc.data()
        })
    }
    // NOTE:Firebaseの設計上タイトル検索を分ける必要がある
    // NOTE:Firebaseの仕様上タイトル検索をしてソートをすることができないため、フロントでソートを行う。
    public async findByTitle(queryQuestion: QuestionQuery): Promise<Question[]> {
        const query = new QuestionQueryBuilder(queryQuestion, this.questionCol).buildForTitle()
        const snapShot = await getDocs(query)
        return snapShot.docs.map((doc) => {
            return doc.data()
        })
    }
    public async findById(questionId: string): Promise<Question | undefined> {
        console.log('question by id fetch')
        const questionRef = doc(db, `questions/${questionId}`).withConverter(QuestionConverter)
        const res = await getDoc(questionRef)
        return res.data()
    }
    public async findByUserId(userId: string): Promise<Question[]> {
        console.log('question by userId fetch')
        const questionQuery = query(this.questionCol, where('userId', '==', userId), orderBy('createdAt', 'desc'))
        const snapShot = await getDocs(questionQuery)
        return snapShot.docs.map((doc) => {
            return doc.data()
        })
    }
    public async save(question: Question): Promise<void> {
        console.log(question)
        addDoc(this.questionCol, question)
    }
    public async update(question: Partial<Question>, questionId: string): Promise<void> {
        const questionDoc = doc(db, 'questions', questionId)
        updateDoc(questionDoc, convertUndefinedToNull(question))
    }
    public async delete(questionId: string): Promise<void> {
        const questionDoc = doc(db, 'questions', questionId)
        deleteDoc(questionDoc)
    }
}

export const questionRepository = new QuestionRepositoryImpl()
