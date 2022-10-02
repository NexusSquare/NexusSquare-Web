export const ERROR = {
    EMAIL_ALREADY_EXISTS: 'auth/email-already-in-use',
    WRONG_PASSWORD: 'auth/wrong-password',
    INVALID_EMAIL: 'auth/invalid-email',
    USER_NOT_FOUND: 'auth/user-not-found',
} as const

export const ERROR_MESSAGE = {
    EMAIL_ALREADY_EXISTS: '既にメールアドレスは登録されています。',
    WRONG_PASSWORD: 'パスワードが間違っています。',
    INVALID_EMAIL: 'メールアドレスが正しくありません。',
    USER_NOT_FOUND: 'ユーザーが存在しません。',
    SERVER: 'サーバー側でエラーが発生しました。',
} as const
