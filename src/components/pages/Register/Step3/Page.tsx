import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    HStack,
    useDisclosure,
    VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { PrimaryButton } from '../../../ui/common/Button/PrimaryButton'
import { useCreateUserForm } from '../../../../hooks/useCreateUserForm'
import Department from '../../../../entities/Department'
import { gradeList } from '../../../../entities/Grade'
import { useErrorToast } from '../../../../hooks/toast/useErrorToast'
import { ERROR_MESSAGE } from '../../../../constants/errors'
import { usePostUser } from '../../../../hooks/user'
import { UserReq } from '../../../../api/req/UserReq'
import { FormLayout } from '../../../ui/features/FormLayout'
import { RuleModal } from './_RuleModal'
import { useState } from 'react'
import { pagesPath } from '../../../../lib/$path'
import { UserParams } from '../../../../entities/factories/userFactory'
import { User, UserMeta } from '../../../../entities/user'
import { useUser, useUserMeta } from '../../../../store/atom'
import { Input } from '../../../ui/common/Input'
import { Select } from '../../../ui/common/Select'
import { Checkbox } from '../../../ui/common/Checkbox'

export const Page = (): JSX.Element => {
    const router = useRouter()
    const { register, handleSubmit, errors, selectSubjects } = useCreateUserForm()
    const [formValue, setFormValue] = useState<UserParams>()
    const { mutate: postUser, isLoading } = usePostUser()
    const { setUser } = useUser()
    const { setUserMeta } = useUserMeta()
    const errorToast = useErrorToast()
    const { isOpen: isOpenRuleModal, onOpen: onOpenRuleModal, onClose: onCloseRuleModal } = useDisclosure()

    const onSubmit = handleSubmit((value: UserParams) => {
        setFormValue(value)
        onOpenRuleModal()
    })

    const onSuccessPostUser = async ({ user, userMeta }: { user: User; userMeta: UserMeta }) => {
        setUser(user)
        setUserMeta(userMeta)
        router.push(pagesPath.qa.$url())
    }

    const onClickAgreeRule = async (formValue?: UserParams) => {
        if (!formValue) return
        postUser(formValue, {
            onSuccess: (data) => {
                onSuccessPostUser(data)
            },
            onError: () => {
                errorToast(ERROR_MESSAGE.SERVER)
            },
        })
    }
    return (
        <>
            <FormLayout title="アカウント登録">
                <VStack as="form" onSubmit={onSubmit} w={'full'} paddingTop="20px" alignItems="center" spacing={4}>
                    <FormControl isInvalid={errors.name !== undefined} isRequired>
                        <FormLabel fontWeight={'bold'}>名前</FormLabel>
                        <Input
                            id="name"
                            {...register('name', {
                                required: '必須項目です',
                                minLength: { value: 1, message: '名前は最小1文字必要です' },
                                maxLength: { value: 20, message: '名前は20文字までです' },
                            })}
                            placeholder="名前"
                        />
                        <FormHelperText>投稿したときに名前は表示されません</FormHelperText>
                        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.nickname !== undefined} isRequired>
                        <FormLabel fontWeight={'bold'}>ニックネーム</FormLabel>
                        <Input
                            id="nicknames"
                            {...register('nickname', {
                                required: '必須項目です',
                                minLength: { value: 1, message: 'ニックネーム最小1文字必要です' },
                                maxLength: { value: 20, message: 'ニックネームは20文字までです' },
                            })}
                            placeholder="ニックネーム"
                        />
                        <FormErrorMessage>{errors.nickname && errors.nickname.message}</FormErrorMessage>
                    </FormControl>
                    <HStack w="full">
                        <FormControl isInvalid={errors.department !== undefined} isRequired>
                            <FormLabel fontWeight={'bold'}>学部</FormLabel>
                            <Select
                                id="department"
                                placeholder="学部(研究科)を選択"
                                {...register('department', {
                                    required: '必須項目です',
                                })}
                            >
                                {Object.values(Department).map((department) => {
                                    return (
                                        <option key={department} value={department}>
                                            {department}
                                        </option>
                                    )
                                })}
                            </Select>
                            <FormErrorMessage>{errors.department && errors.department.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={errors.subject !== undefined} isRequired>
                            <FormLabel fontWeight={'bold'}>学科（専攻）</FormLabel>
                            <Select
                                id="subject"
                                placeholder="学科（専攻）を選択"
                                {...register('subject', {
                                    required: '必須項目です',
                                })}
                            >
                                {selectSubjects.map((selectItem: string) => {
                                    return (
                                        <option key={selectItem} value={selectItem}>
                                            {selectItem}
                                        </option>
                                    )
                                })}
                            </Select>
                            <FormErrorMessage>{errors.subject && errors.subject.message}</FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <FormControl isInvalid={errors.grade !== undefined} isRequired>
                        <FormLabel fontWeight={'bold'}>学年</FormLabel>
                        <Select
                            id="grade"
                            placeholder="学年を選択"
                            {...register('grade', {
                                required: '必須項目です',
                            })}
                        >
                            {gradeList.map((grade: string) => {
                                return (
                                    <option key={grade} value={grade}>
                                        {grade}
                                    </option>
                                )
                            })}
                        </Select>
                        <FormErrorMessage>{errors.grade && errors.grade.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.isDepartmentAnonymous !== undefined}>
                        <Checkbox
                            id="isDepartmentAnonymous"
                            {...register('isDepartmentAnonymous')}
                            colorScheme="orange"
                        >
                            投稿したときの学部を非表示にする
                        </Checkbox>
                        <FormHelperText>あとから編集することができます</FormHelperText>
                        <FormErrorMessage>
                            {errors.isDepartmentAnonymous && errors.isDepartmentAnonymous.message}
                        </FormErrorMessage>
                    </FormControl>
                    <PrimaryButton
                        buttonText="アカウント登録"
                        type="submit"
                        width={48}
                        isLoading={isLoading}
                        disabled={isLoading}
                    />
                </VStack>
            </FormLayout>
            <RuleModal
                isOpen={isOpenRuleModal}
                onClose={onCloseRuleModal}
                isLoading={isLoading}
                onClick={() => {
                    onClickAgreeRule(formValue)
                }}
            />
        </>
    )
}
