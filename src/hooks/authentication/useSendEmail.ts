import { useAuthSendEmailVerification } from '@react-query-firebase/auth'
import { actionCodeSettings, auth } from '../../plugins/firebase'

interface AfterFunction {
    onSuccess?: Function
    onSettled?: Function
    onError?: Function
}

export const useSendEmail = () => {
    const mutation = useAuthSendEmailVerification()
    const sendEmail = async (args?: AfterFunction) => {
        mutation.mutate(
            {
                user: auth.currentUser!,
                actionCodeSettings: actionCodeSettings,
            },
            {
                onSuccess: () => args?.onSuccess?.(),
                onError: () => args?.onError?.(),
                onSettled: () => args?.onSettled?.(),
            }
        )
    }
    return { ...mutation, mutate: sendEmail }
}
