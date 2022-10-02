import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    HStack,
    Input,
    Select,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { PrimaryButton } from '../../../common/PrimaryButton'
import { useCreateUserForm } from '../../../../hooks/useCreateUserForm'
import { UserInfoFormValue } from '../../../../types/domain/form'
import Department from '../../../../constants/department'
import { gradeList } from '../../../../constants/grade'
import { usePostUser } from '../../../../hooks/firebase/user'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'
import { ERROR_MESSAGE } from '../../../../constants/errors'

export const Page = (): JSX.Element => {
    const router = useRouter()
    const { register, handleSubmit, errors, isSubmitting, selectSubjects } = useCreateUserForm()
    const { postUser, error: postError, loading } = usePostUser()
    const errorToast = useErrorToast()

    const onSubmitUserProfile = async (formValue: UserInfoFormValue) => {
        await postUser(formValue)
        if (postError) {
            console.log(postError)
            errorToast(ERROR_MESSAGE.SERVER)
        }
    }

    return (
        <HStack w="100%" h="full" paddingX={{ base: 4, md: 0 }}>
            <VStack
                bg="white"
                w={{ base: 'full', md: '2xl' }}
                marginX={'auto'}
                paddingY={12}
                paddingX={{ base: 8, md: 24 }}
            >
                <Box as="h2" fontWeight={'bold'} fontSize={'xl'}>
                    プロフィール登録
                </Box>
                <Divider />

                <VStack
                    as="form"
                    onSubmit={handleSubmit((formValue) => onSubmitUserProfile(formValue))}
                    w={'full'}
                    paddingTop="20px"
                    alignItems="center"
                    spacing={4}
                >
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
                        <Checkbox id="isDepartmentAnonymous" {...register('isDepartmentAnonymous')}>
                            投稿したときの学部を非表示にする
                        </Checkbox>
                        <FormHelperText>あとから編集することができます</FormHelperText>
                        <FormErrorMessage>
                            {errors.isDepartmentAnonymous && errors.isDepartmentAnonymous.message}
                        </FormErrorMessage>
                    </FormControl>
                    <PrimaryButton
                        buttonText="プロフィール登録"
                        type="submit"
                        width={48}
                        isLoading={loading}
                        disabled={loading}
                    />
                </VStack>
            </VStack>
        </HStack>
    )
}
