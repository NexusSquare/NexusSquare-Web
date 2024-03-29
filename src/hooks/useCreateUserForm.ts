import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    departmentToSubject,
    Foreign,
    Globalre,
    Humanre,
    Info,
    Infore,
    Japan,
    Nurse,
    Nursere,
    Teach,
} from '../entities/Subject'

import { UserParams } from '../entities/factories/userFactory'
import { departmentToGrades } from '../entities/Grade'

// NOTE optionsの型推論が効かない。UseFormProps
export const useCreateUserForm = (options?: any) => {
    const {
        register,
        handleSubmit,
        resetField,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<UserParams>(options)

    const [selectSubjects, setSelectSubjects] = useState<string[]>([])
    const [gradeOptions, setGradeOptions] = useState<string[]>([])
    const watchDepartment = watch('department')

    useEffect(() => {
        resetField('subject')
        const subjects: string[] = departmentToSubject(watchDepartment)
        setSelectSubjects(subjects)
        setGradeOptions(departmentToGrades(watchDepartment))

        return () => {
            setSelectSubjects([])
        }
    }, [watchDepartment])

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        selectSubjects,
        gradeOptions,
    }
}
