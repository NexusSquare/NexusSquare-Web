import { useCallback, useRef, useState } from 'react'

export const useFile = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File>()
    const onChangeFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const inputFiles = event.target.files
        if (!inputFiles) return
        const file = inputFiles[0]
        setFile(file)
        return () => {
            setFile(undefined)
        }
    }, [])
    const onClickFile = useCallback(() => {
        inputRef.current?.click()
    }, [])
    return {
        inputRef,
        file,
        onChangeFile,
        onClickFile,
    }
}
