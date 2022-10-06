import { getDownloadURL, ref } from 'firebase/storage'
import { useUploadFile as useUploadFileToStorage } from 'react-firebase-hooks/storage'
import { storage } from '../../plugins/firebase'

export const useUploadFile = () => {
    const [uploadFile, uploading, snapshot, error] = useUploadFileToStorage()
    const upload = async (file: File, filePath: string) => {
        const storageRef = ref(storage, filePath)
        const result = uploadFile(storageRef, file, {
            contentType: 'image/*',
        })
        return result
    }
    const getFileUrl = async (filePath: string): Promise<string> => {
        const storageRef = ref(storage, filePath)
        return getDownloadURL(storageRef)
    }
    return {
        uploadFile: upload,
        getFileUrl,
        uploading,
        snapshot,
        error,
    }
}
