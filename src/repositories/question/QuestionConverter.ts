import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore'
import { Question } from '../../entities/qa'
import { QuestionDocument } from '../documents/QuestionDocument'

export const QuestionConverter = {
    toFirestore(question: Question): DocumentData {
        const document: QuestionDocument = {
            userId: question.userId,
            postUser: {
                nickname: question.postUser.nickname,
                department: question.postUser.department ?? null,
                subject: question.postUser.subject ?? null,
                imageUrl: question.postUser.imageUrl,
                isDepartmentAnonymous: question.postUser.isDepartmentAnonymous,
            },
            categories: question.categories,
            createdAt: Timestamp.fromDate(question.createdAt),
            updatedAt: Timestamp.fromDate(question.updatedAt),
            deadlineDate: Timestamp.fromDate(question.deadlineDate),
            title: question.title,
            content: question.content,
            ansNum: question.ansNum,
            imageUrl: question.imageUrl ?? null,
            isEdited: question.isEdited,
            status: question.status,
            bestAnswerId: question.bestAnswerId ?? null,
            biGram: question.biGram,
        }
        return document
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Question {
        const data = snapshot.data(options)!
        return {
            questionId: snapshot.id,
            userId: data.userId,
            postUser: {
                nickname: data.postUser.nickname,
                department: data.postUser.department ?? undefined,
                subject: data.postUser.subject ?? undefined,
                imageUrl: data.postUser.imageUrl,
                isDepartmentAnonymous: data.postUser.isDepartmentAnonymous,
            },
            categories: data.categories,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
            deadlineDate: data.deadlineDate.toDate(),
            title: data.title,
            content: data.content,
            ansNum: data.ansNum,
            imageUrl: data.imageUrl ?? undefined,
            isEdited: data.isEdited,
            status: data.status,
            bestAnswerId: data.bestAnswerId ?? undefined,
            biGram: data.biGram,
        }
    },
}
