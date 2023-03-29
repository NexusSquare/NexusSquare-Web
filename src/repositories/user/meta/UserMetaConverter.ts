import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore'
import { UserMeta } from '../../../entities/user'
import { UserMetaDocument } from '../../documents/UserMetaDocument'

export const userMetaConverter = {
    toFirestore: (userMeta: UserMeta): DocumentData => {
        const document: UserMetaDocument = {
            department: userMeta.department,
            subject: userMeta.subject,
            grade: userMeta.grade,
            email: userMeta.email,
            name: userMeta.name,
        }
        return document
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): UserMeta => {
        const data = snapshot.data(options)
        return {
            userId: snapshot.id,
            department: data.department,
            subject: data.subject,
            grade: data.grade,
            email: data.email,
            name: data.name,
        }
    },
}
