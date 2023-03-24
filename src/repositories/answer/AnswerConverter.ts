import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore'
import { Answer } from '../../entities/qa/Answer'
import { AnswerDocument } from '../documents/AnswerDocument'

export const answerConverter = {
    toFirestore: (answer: Answer): DocumentData => {
        const document: AnswerDocument = {
            userId: answer.userId,
            postUser: {
                nickname: answer.postUser.nickname,
                department: answer.postUser.department ?? null,
                subject: answer.postUser.subject ?? null,
                imageUrl: answer.postUser.imageUrl,
                isDepartmentAnonymous: answer.postUser.isDepartmentAnonymous,
            },
            questionId: answer.questionId,
            questionTitle: answer.questionTitle,
            createdAt: Timestamp.fromDate(answer.createdAt),
            updatedAt: Timestamp.fromDate(answer.updatedAt),
            content: answer.content,
            isEdited: answer.isEdited,
            imageUrl: answer.imageUrl ?? null,
            isBest: answer.isBest,
        }
        return document
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Answer => {
        const data = snapshot.data(options)!
        return {
            answerId: snapshot.id,
            userId: data.userId,
            postUser: {
                nickname: data.postUser.nickname,
                department: data.postUser.department ?? undefined,
                subject: data.postUser.subject ?? undefined,
                imageUrl: data.postUser.imageUrl,
                isDepartmentAnonymous: data.postUser.isDepartmentAnonymous,
            },
            questionTitle: data.questionTitle,
            questionId: data.questionId,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
            content: data.content,
            isEdited: data.isEdited,
            imageUrl: data.imageUrl ?? undefined,
            isBest: data.isBest,
        }
    },
}
