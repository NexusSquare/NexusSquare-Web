import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { QuestionReq } from '../../api/req'

// NOTE optionsの型推論が効かない。UseFormProps
export const useCreateUserForm = (options?: any) => {
    const {
        register,
        handleSubmit,
        resetField,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<QuestionReq>(options)
    const [category2List, setCategory2List] = useState<string[]>([])
    const watchCategory1 = watch('category1')

    useEffect(() => {
        resetField('category2')

        return () => {
            setCategory2List([])
        }
    }, [watchCategory1])

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        category2List,
    }
}
