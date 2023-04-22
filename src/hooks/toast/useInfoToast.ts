import toast from 'react-hot-toast'

export const useInfoToast = () => {
    const infoToast = (message: string) => {
        toast.success(message, {
            position: 'bottom-center',
        })
    }
    return infoToast
}
