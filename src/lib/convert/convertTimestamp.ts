import { format } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

export const convertDateToString = (date: Date): string => {
    return format(date, 'yyyy/MM/dd')
}
