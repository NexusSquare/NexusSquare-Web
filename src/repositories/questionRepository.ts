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
import { QuestionQuery } from '../constants/query'
import { db } from '../plugins/firebase/client'
import { Question } from '../entities/qa/Question'

class QuestionRepository {
    private questionCol = collection(db, 'questions')

    public async find(queryQuestion: QuestionQuery): Promise<Question[]> {
        console.log('question fetch')
        const queryArgs = this.createQueryArgs(queryQuestion)
        const questionRef = query(this.questionCol, ...queryArgs, limit(15))
        const snapShot = await getDocs(questionRef)
        return snapShot.docs.map((doc) => {
            return { ...doc.data(), questionId: doc.id } as Question
        })
    }
    // NOTE:Firebaseの設計上タイトル検索を分ける必要がある
    // NOTE:Firebaseの仕様上タイトル検索をしてソートをすることができないため、フロントでソートを行う。
    public async findByTitle(queryQuestion: QuestionQuery): Promise<Question[]> {
        const grams: string[] = bigram(queryQuestion.title)
        // NOTE:queryに渡す引数を生成
        const queryArgs = this.createTitleIndex(grams)
        if (queryQuestion.categories.length !== 0)
            queryArgs.push(where('categories', 'array-contains-any', queryQuestion.categories))
        queryArgs.push(where('status', '==', queryQuestion.status))

        const questionQuery = query(this.questionCol, ...queryArgs)
        const snapShot = await getDocs(questionQuery)
        return snapShot.docs.map((doc) => {
            return { ...doc.data(), questionId: doc.id } as Question
        })
    }
    public async findById(questionId: string): Promise<Question> {
        console.log('question by id fetch')
        const questionRef = doc(db, `questions/${questionId}`)
        const res = await getDoc(questionRef)
        const question = { ...res.data(), questionId: res.id } as Question
        return question
    }
    public async findByUserId(userId: string): Promise<Question[]> {
        console.log('question by userId fetch')
        const questionQuery = query(this.questionCol, where('userId', '==', userId), orderBy('createAt', 'desc'))
        const snapShot = await getDocs(questionQuery)
        return snapShot.docs.map((doc) => {
            return { ...doc.data(), questionId: doc.id } as Question
        })
    }
    // NOTE QuestionにIDが含まれていないため、Omitを使用
    public async save(question: Omit<Question, 'questionId'>): Promise<void> {
        console.log(question)
        addDoc(this.questionCol, question)
    }
    public async update(question: Partial<Question>, questionId: string): Promise<void> {
        const questionDoc = doc(db, 'questions', questionId)
        updateDoc(questionDoc, question)
    }
    public async delete(questionId: string): Promise<void> {
        const questionDoc = doc(db, 'questions', questionId)
        deleteDoc(questionDoc)
    }
    private createQueryArgs = (query: QuestionQuery): QueryConstraint[] => {
        let args: QueryConstraint[] = []
        args.push(orderBy(query.orderBy, query.direction))
        args.push(where('status', '==', query.status))
        if (query.categories.length === 0) return args
        args.push(where('categories', 'array-contains-any', query.categories))
        return args
    }
    // NOTE: n-gramsでタイトル検索を実現
    private createTitleIndex = (grams: string[]): QueryConstraint[] => {
        let args: QueryConstraint[] = []
        grams.forEach((gram) => {
            args.push(where(`biGram.${gram}`, '==', true))
        })
        return args
    }
}

export const questionRepository = new QuestionRepository()
