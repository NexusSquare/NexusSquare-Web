import { FormControl, FormErrorMessage, Input, Select, Checkbox, VStack, FormLabel } from '@chakra-ui/react'
import Department from '../../../entities/Department'
import React from 'react'
import { User } from '../../../entities/user'
import { PrimaryButton } from '../../common/buttons/PrimaryButton'
import { gradeList } from '../../../entities/Grade'
import { useCreateUserForm } from '../../../hooks/useCreateUserForm'
import { UserReq } from '../../../api/req/UserReq'

interface Props {
    user: User
    updateProfile: (value: Partial<UserReq>) => Promise<void>
    isLoading: boolean
}

export const EditForm = ({ user, updateProfile, isLoading }: Props) => {
    const { register, handleSubmit, errors, isSubmitting, selectSubjects } = useCreateUserForm({
        reValidateMode: 'onChange',
    })

    return (
        <VStack
            as="form"
            onSubmit={handleSubmit((formValue) => {
                console.log(formValue)
                updateProfile(formValue)
            })}
            w={'full'}
            alignItems="center"
            spacing={4}
            p={4}
        >
            <FormControl isInvalid={errors.nickname !== undefined}>
                <FormLabel fontWeight={'bold'}>ニックネーム</FormLabel>
                <Input
                    id="nicknames"
                    {...register('nickname', {
                        required: '必須項目です',
                        minLength: { value: 1, message: 'ニックネーム最小1文字必要です' },
                        maxLength: { value: 20, message: 'ニックネームは20文字までです' },
                    })}
                    placeholder="ニックネーム"
                    defaultValue={user.nickname}
                />
                <FormErrorMessage>{errors.nickname && errors.nickname.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.department !== undefined}>
                <FormLabel fontWeight={'bold'}>学部</FormLabel>
                <Select
                    id="department"
                    placeholder="学部(研究科)を選択"
                    {...register('department', {
                        required: '必須項目です',
                    })}
                    defaultValue={user.department}
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

            <FormControl isInvalid={errors.subject !== undefined}>
                <FormLabel fontWeight={'bold'}>学科（専攻）</FormLabel>
                <Select
                    id="subject"
                    placeholder="学科（専攻）を選択"
                    {...register('subject', {
                        required: '必須項目です',
                    })}
                    defaultValue={user.subject}
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

            <FormControl isInvalid={errors.grade !== undefined}>
                <FormLabel fontWeight={'bold'}>学年</FormLabel>
                <Select
                    id="grade"
                    placeholder="学年を選択"
                    {...register('grade', {
                        required: '必須項目です',
                    })}
                    defaultValue={user.grade}
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
                <Checkbox id="isDepartmentAnonymous" {...register('isDepartmentAnonymous')}>
                    投稿したときの学部を非表示にする
                </Checkbox>

                <FormErrorMessage>
                    {errors.isDepartmentAnonymous && errors.isDepartmentAnonymous.message}
                </FormErrorMessage>
            </FormControl>
            <PrimaryButton buttonText="編集する" type="submit" width={48} isLoading={isLoading} disabled={isLoading} />
        </VStack>
    )
}
