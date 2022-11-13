import { EMAIL, USER_ID } from '../constants/token'

export const useSessionToken = () => {
    const deleteSessionToken = () => {
        sessionStorage.removeItem(USER_ID)
        sessionStorage.removeItem(EMAIL)
    }

    const setSessionToken = (id: string, email: string) => {
        sessionStorage.setItem(USER_ID, id)
        sessionStorage.setItem(EMAIL, email)
    }
    return {
        deleteToken: deleteSessionToken,
        setToken: setSessionToken,
    }
}
