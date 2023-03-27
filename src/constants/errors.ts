export const ERROR = {
    EMAIL_ALREADY_EXISTS: 'auth/email-already-in-use',
    WRONG_PASSWORD: 'auth/wrong-password',
    INVALID_EMAIL: 'auth/invalid-email',
    USER_NOT_FOUND: 'auth/user-not-found',
    INVALID_USER_TOKEN: 'auth/invalid-user-token',
    NO_SUCH_DOCUMENT: 'db/no-such-documents',
    EXISTS_DOCUMENT_ALREADY: 'db/exists_document_already',
    LOGIN_REQUIRED: 'auth/login-required',
} as const

export const ERROR_MESSAGE = {
    EMAIL_ALREADY_EXISTS: '既にメールアドレスは登録されています。',
    WRONG_PASSWORD: 'パスワードが間違っています。',
    INVALID_EMAIL: 'メールアドレスが正しくありません。',
    USER_NOT_FOUND: 'ユーザーが存在しません。',
    SERVER: 'サーバー側でエラーが発生しました。',
    INVALID_USER_TOKEN: 'セッションが切れました。もう一度ログインしてください',
    NO_SUCH_USER: 'ユーザーが存在しません。',
    EXISTS_USER_ALREADY: 'ユーザーはすでに存在しています。',
} as const
