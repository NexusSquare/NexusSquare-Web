import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore'
import { HistoryDocument } from '../documents/HistoryDocument'
import { History } from '../../entities/history'
export const historyConverter = {
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): History {
        const data = snapshot.data(options)
        return {
            historyId: snapshot.id,
            point: data.point,
            createdAt: data.createdAt.toDate(),
            type: data.type,
            postId: data.postId,
        }
    },
    toFirestore(history: History): DocumentData {
        const document: HistoryDocument = {
            point: history.point,
            createdAt: Timestamp.fromDate(history.createdAt),
            type: history.type,
            postId: history.postId,
        }
        return document
    },
}
