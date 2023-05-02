import { useEffect } from 'react'

export const useConsoleLog = (value: any) => {
    useEffect(() => {
        console.log(value)
    }, [value])
}
