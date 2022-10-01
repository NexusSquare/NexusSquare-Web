import { useCallback } from 'react'
import { ERROR } from '../../constants/errors'
import { useErrorToast } from './useErrorToast'

export const useAlertLoginError = () => {
    const errorToast = useErrorToast()
    const alertLoginError = useCallback((message: string) => {
        switch (message) {
            case ERROR.INVALID_EMAIL:
                errorToast('メールアドレスが正しくありません')
                break
            case ERROR.WRONG_PASSWORD:
                errorToast('パスワードが間違っています')
                break
            case ERROR.USER_NOT_FOUND:
                errorToast('ユーザーが存在しません')
                break
            default:
                errorToast('サーバーエラー')
        }
    }, [])
    return { alertLoginError: alertLoginError }
}
