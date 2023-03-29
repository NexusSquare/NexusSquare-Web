import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore'
import { User } from '../../entities/user'
import { UserDocument } from '../documents/UserDocument'

export const userConverter = {
    toFirestore: (user: User): DocumentData => {
        const document: UserDocument = {
            department: user.department ?? null,
            subject: user.subject ?? null,
            grade: user.grade,
            nickname: user.nickname,
            imageUrl: user.imageUrl,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
            isDepartmentAnonymous: user.isDepartmentAnonymous,
            point: user.point,
            totalPoint: user.totalPoint,
        }
        return document
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User => {
        const data = snapshot.data(options)
        return {
            userId: snapshot.id,
            department: data.department ?? undefined,
            subject: data.subject ?? undefined,
            grade: data.grade,
            nickname: data.nickname,
            imageUrl: data.imageUrl,
            updatedAt: data.updatedAt,
            createdAt: data.createdAt,
            isDepartmentAnonymous: data.isDepartmentAnonymous,
            point: data.point,
            totalPoint: data.totalPoint,
        }
    },
}
