import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Foreign, Globalre, Humanre, Info, Infore, Japan, Nurse, Nursere, Teach } from '../constants/subject'
import { UserInfoFormValue } from '../types/domain/form'

export const useCreateUserForm = () => {
    const {
        register,
        handleSubmit,
        resetField,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<UserInfoFormValue>()
    const [selectSubjects, setSelectSubjects] = useState<string[]>([])
    const watchDepartment = watch('department')

    useEffect(() => {
        resetField('subject')
        switch (watchDepartment) {
            case '外国語学部':
                setSelectSubjects(Object.values(Foreign))
                break
            case '日本文化学部':
                setSelectSubjects(Object.values(Japan))
                break
            case '教育福祉学部':
                setSelectSubjects(Object.values(Teach))
                break
            case '看護学部':
                setSelectSubjects(Object.values(Nurse))
                break
            case '情報科学部':
                setSelectSubjects(Object.values(Info))
                break
            case '国際文化研究科':
                setSelectSubjects(Object.values(Globalre))
                break
            case '人間発達学研究科':
                setSelectSubjects(Object.values(Humanre))
                break
            case '看護学研究科':
                setSelectSubjects(Object.values(Nursere))
                break
            case '情報科学絵研究科':
                setSelectSubjects(Object.values(Infore))
                break
            default:
                setSelectSubjects([])
                break
        }
    }, [watchDepartment])
    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        selectSubjects,
    }
}