export const NOTIFICATION_TYPE = {
    BEST_ANSWER: 'BEST_ANSWER',
    ANSWER: 'ANSWER',
    INFORMATION: 'INFORMATION',
} as const

export const NOTIFICATION_MESSAGE = {
    BEST_ANSWER: (name: string) => `${name}さんがベストアンサーに選びました。`,
    ANSWER: (name: string) => `${name}さんが回答しました。`,
} as const

export const createNotificationMessage = (type: string, userName: string): string => {
    let notificationMessage = ''
    switch (type) {
        case NOTIFICATION_TYPE.ANSWER:
            notificationMessage = NOTIFICATION_MESSAGE.ANSWER(userName)
            break
        case NOTIFICATION_TYPE.BEST_ANSWER:
            notificationMessage = NOTIFICATION_MESSAGE.BEST_ANSWER(userName)
    }
    return notificationMessage
}
