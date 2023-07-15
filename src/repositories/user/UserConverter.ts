import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore'
import { User } from '../../entities/user'
import { UserDocument } from '../documents/UserDocument'

export const userConverter = {
    toFirestore: (user: User): DocumentData => {
        const document: UserDocument = {
            department: user.department,
            subject: user.subject,
            grade: user.grade,
            nickname: user.nickname,
            imageUrl: user.imageUrl,
            updatedAt: Timestamp.fromDate(user.updatedAt),
            createdAt: Timestamp.fromDate(user.createdAt),
            isDepartmentAnonymous: user.isDepartmentAnonymous,
            point: user.point,
            totalPoint: user.totalPoint,
        }
        return document
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User => {
        const data = snapshot.data(options) as UserDocument
        return {
            userId: snapshot.id,
            department: data.department,
            subject: data.subject,
            grade: data.grade,
            nickname: data.nickname,
            imageUrl: data.imageUrl,
            updatedAt: data.updatedAt.toDate(),
            createdAt: data.createdAt.toDate(),
            isDepartmentAnonymous: data.isDepartmentAnonymous,
            point: data.point,
            totalPoint: data.totalPoint,
        }
    },
}
