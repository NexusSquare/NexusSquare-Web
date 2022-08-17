import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    HStack,
    Input,
    Select,
    Checkbox,
    useDisclosure,
    ModalBody,
    ModalFooter,
    Spacer,
} from '@chakra-ui/react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Department from '../../groupObject/department'
import PostUser from '../../types/api/req/account/PostUser.'
import Foreign from '../../groupObject/subject/foreign'
import Globalre from '../../groupObject/subject/globalre'
import Humanre from '../../groupObject/subject/humanre'
import Info from '../../groupObject/subject/info'
import Infore from '../../groupObject/subject/infore'
import Japan from '../../groupObject/subject/japan'
import Nurse from '../../groupObject/subject/nurse'
import Nursere from '../../groupObject/subject/nursere'
import Subject from '../../groupObject/subject/subject'
import Teach from '../../groupObject/subject/teach'
import RegisterInfo from '../../types/domain/account/RegisterInfo'
import User from '../../types/domain/account/User'
import React from 'react'
import UpdateUser from '../../types/api/req/account/UpdateUser'

interface Props {
    updateUser: UpdateUser
    onClose: () => void
    updateProfile: (value: UpdateUser) => Promise<void>
}

export const EditForm = ({ updateUser, updateProfile, onClose }: Props) => {
    const {
        register,
        handleSubmit,
        watch,
        resetField,
        formState: { errors, isSubmitting },
    } = useForm<PostUser>({
        mode: 'onChange',
        defaultValues: updateUser,
    })
    const [selectSubjects, setSelectSubjects] = useState<string[]>([])
    const watchDepartment = watch('department')

    const editProfile = async (editedUser: PostUser) => {
        await updateProfile(editedUser)
        onClose()
    }
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
    const DepartmentList: Function = useCallback(() => {
        return Object.values(Department).map((department) => {
            return (
                <option key={department} value={department}>
                    {department}
                </option>
            )
        })
    }, [])
    const SubjectList: Function = useCallback(() => {
        return selectSubjects.map((selectItem) => {
            return (
                <option key={selectItem} value={selectItem}>
                    {selectItem}
                </option>
            )
        })
    }, [selectSubjects])
    const GradeList: Function = useCallback(() => {
        const list = []
        for (let i = 1; i < 5; i++)
            list.push(
                <option key={i} value={i}>
                    {i}年生
                </option>
            )
        return list
    }, [])
    return (
        <Box as="form" onSubmit={handleSubmit(editProfile)} p={4} alignItems="center">
            <HStack>
                <FormControl isInvalid={errors.lastname !== undefined}>
                    <Input
                        id="lastname"
                        {...register('lastname', {
                            required: '必須項目です',
                            minLength: { value: 1, message: '苗字は最小1文字必要です' },
                            maxLength: { value: 20, message: '苗字は20文字までです' },
                        })}
                        placeholder="苗字"
                    />
                    <FormErrorMessage>{errors.lastname && errors.lastname.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.firstname !== undefined}>
                    <Input
                        id="firstname"
                        {...register('firstname', {
                            required: '必須項目です',
                            minLength: { value: 1, message: '名前は最小1文字必要です' },
                            maxLength: { value: 20, message: '名前は20文字までです' },
                        })}
                        placeholder="名前"
                    />
                    <FormErrorMessage>{errors.firstname && errors.firstname.message}</FormErrorMessage>
                </FormControl>
            </HStack>
            <br />
            <HStack>
                <FormControl isInvalid={errors.lastnameFurigana !== undefined}>
                    <Input
                        id="lastnameFuribana"
                        {...register('lastnameFurigana', {
                            required: '必須項目です',
                            minLength: { value: 1, message: '苗字は最小1文字必要です' },
                            maxLength: { value: 20, message: '苗字は20文字までです' },
                            pattern: { value: /^[ぁ-ん]+$/, message: 'ひらがなを入力してください' },
                        })}
                        placeholder="苗字(ふりがな)"
                    />
                    <FormErrorMessage>{errors.lastnameFurigana && errors.lastnameFurigana.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.firstnameFurigana !== undefined}>
                    <Input
                        id="firstnameFurigana"
                        {...register('firstnameFurigana', {
                            required: '必須項目です',
                            minLength: { value: 1, message: '名前は最小1文字必要です' },
                            maxLength: { value: 20, message: '名前は20文字までです' },
                            pattern: { value: /^[ぁ-ん]+$/, message: 'ひらがなを入力してください' },
                        })}
                        placeholder="名前(ふりがな)"
                    />
                    <FormErrorMessage>{errors.firstnameFurigana && errors.firstnameFurigana.message}</FormErrorMessage>
                </FormControl>
            </HStack>
            <br />
            <FormControl isInvalid={errors.isNameAnonymous !== undefined}>
                <Checkbox id="isNameAnonymous" {...register('isNameAnonymous')}>
                    名前を非表示にする
                </Checkbox>
                <FormErrorMessage>{errors.isNameAnonymous && errors.isNameAnonymous.message}</FormErrorMessage>
            </FormControl>
            <br />
            <FormControl isInvalid={errors.department !== undefined}>
                <Select
                    id="department"
                    placeholder="学部(研究科)を選択"
                    {...register('department', {
                        required: '必須項目です',
                    })}
                >
                    <DepartmentList />
                </Select>
                <FormErrorMessage>{errors.department && errors.department.message}</FormErrorMessage>
            </FormControl>
            <br />
            <FormControl isInvalid={errors.subject !== undefined}>
                <Select
                    id="subject"
                    placeholder="学科(専攻)を選択"
                    {...register('subject', {
                        required: '必須項目です',
                    })}
                >
                    <SubjectList />
                </Select>
                <FormErrorMessage>{errors.subject && errors.subject.message}</FormErrorMessage>
            </FormControl>
            <br />
            <FormControl isInvalid={errors.grade !== undefined}>
                <Select
                    id="grade"
                    placeholder="学年を選択"
                    {...register('grade', {
                        required: '必須項目です',
                    })}
                >
                    <GradeList />
                </Select>
                <FormErrorMessage>{errors.grade && errors.grade.message}</FormErrorMessage>
            </FormControl>
            <br />
            <FormControl isInvalid={errors.isDepartmentAnonymous !== undefined}>
                <Checkbox id="isDepartmentAnonymous" {...register('isDepartmentAnonymous')}>
                    学部を非表示にする
                </Checkbox>
                <FormErrorMessage>
                    {errors.isDepartmentAnonymous && errors.isDepartmentAnonymous.message}
                </FormErrorMessage>
            </FormControl>
            <br />
            <HStack>
                <Spacer />
                <Button
                    type="submit"
                    justifySelf="center"
                    color="white"
                    bgColor="mainColor"
                    _hover={{ bgColor: 'subSubColor' }}
                    isLoading={isSubmitting}
                >
                    編集する
                </Button>
            </HStack>
        </Box>
    )
}
