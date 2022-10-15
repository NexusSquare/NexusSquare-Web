import { format } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

export const convertTimestampToString = (date: Timestamp): string => {
    return format(date.toDate(), 'yyyy/MM/dd')
}
