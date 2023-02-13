import { useCallback } from 'react'
import { ERROR, ERROR_MESSAGE } from '../../constants/errors'
import { useErrorToast } from './useErrorToast'

export const useAlertLoginError = () => {
    const errorToast = useErrorToast()
    const alertLoginError = useCallback(
        (message: string) => {
            switch (message) {
                case ERROR.INVALID_EMAIL:
                    errorToast(ERROR_MESSAGE.INVALID_EMAIL)
                    break
                case ERROR.WRONG_PASSWORD:
                    errorToast(ERROR_MESSAGE.WRONG_PASSWORD)
                    break
                case ERROR.USER_NOT_FOUND:
                    errorToast(ERROR_MESSAGE.USER_NOT_FOUND)
                    break
                default:
                    errorToast(ERROR_MESSAGE.SERVER)
            }
        },
        [errorToast]
    )
    return { alertLoginError: alertLoginError }
}
