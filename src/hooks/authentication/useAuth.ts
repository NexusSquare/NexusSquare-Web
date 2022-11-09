import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../plugins/firebase/client'

// NOTE react query firebase の　　auth状態の挙動がおかしかったので、別ライブラリーを使用
export const useAuth = () => {
    const [data, isLoading, error] = useAuthState(auth)
    return {
        data,
        isLoading,
        error,
    }
}
