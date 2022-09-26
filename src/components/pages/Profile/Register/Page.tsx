import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    HStack,
    Input,
    Select,
    Text,
    VStack,
    Radio,
    RadioGroup,
    Stack,
    Checkbox,
    useDisclosure,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/react'
import axios from 'axios'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Router, { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { memo } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ChancelButton } from '../../../../components/common/ChancelButton'
import { DefaultModal } from '../../../../components/common/DefaultModal'
import { PrimaryButton } from '../../../../components/common/PrimaryButton'
import Department from '../../../../constants/department'
import Foreign from '../../../../constants/subject/foreign'
import Globalre from '../../../../constants/subject/globalre'
import Humanre from '../../../../constants/subject/humanre'
import Info from '../../../../constants/subject/info'
import Infore from '../../../../constants/subject/infore'
import Japan from '../../../../constants/subject/japan'
import Nurse from '../../../../constants/subject/nurse'
import Nursere from '../../../../constants/subject/nursere'
import Subject from '../../../../constants/subject/subject'
import Teach from '../../../../constants/subject/teach'
import { clientApi } from '../../../../lib/axios'
import PostUser from '../../../../types/api/req/account/PostUser'
import RegisterInfo from '../../../../types/domain/account/RegisterInfo'
import User from '../../../../types/domain/account/User'

export const Page = (): JSX.Element => {
    const {
        register,
        handleSubmit,
        watch,
        resetField,
        formState: { errors, isSubmitting },
    } = useForm<PostUser>()
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { data: session, status } = useSession()
    const [selectSubjects, setSelectSubjects] = useState<string[]>([])
    const [registerInfo, setRegisterInfo] = useState<RegisterInfo>()
    const watchDepartment = watch('department')
    const MAX_GRADE = 4

    const onSubmitHandler = (data: RegisterInfo) => {
        onOpen()
        setRegisterInfo(data)
    }
    const registerUser = async () => {
        const mailAddress = session?.user?.email
        const perfectRegisterInfo = { ...registerInfo, mailAddress, point: 0 }
        await clientApi
            .post('/user', perfectRegisterInfo, {
                headers: {
                    Authorization: `${session?.idToken}`,
                },
            })
            .then(() => {
                router.replace('/qa')
            })
            .catch((err) => {
                throw err
            })
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
    // eslint-disable-next-line react/display-name
    const RegisterForm = memo(() => {
        return (
            <Box
                as="form"
                onSubmit={handleSubmit(onSubmitHandler)}
                w={{ base: '100%', sm: '80vw', md: 'calc(100vw - 270px)', lg: '50vw' }}
                paddingTop="20px"
                alignItems="center"
            >
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
                        <FormErrorMessage>
                            {errors.lastnameFurigana && errors.lastnameFurigana.message}
                        </FormErrorMessage>
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
                        <FormErrorMessage>
                            {errors.firstnameFurigana && errors.firstnameFurigana.message}
                        </FormErrorMessage>
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
                <Button type="submit" justifySelf="center">
                    送信する
                </Button>
                <DefaultModal isOpen={isOpen} onClose={onClose} title="ユーザ登録しますか？">
                    <>
                        <ModalBody>登録情報はあとで変更することが可能です。</ModalBody>
                        <ModalFooter>
                            <HStack>
                                <ChancelButton buttonText="キャンセル" onClick={onClose} />
                                <PrimaryButton buttonText="登録する" onClick={registerUser} />
                            </HStack>
                        </ModalFooter>
                    </>
                </DefaultModal>
            </Box>
        )
    })
    return (
        <VStack paddingTop="60px">
            <Text>ユーザー情報登録</Text>
            <RegisterForm />
        </VStack>
    )
}
