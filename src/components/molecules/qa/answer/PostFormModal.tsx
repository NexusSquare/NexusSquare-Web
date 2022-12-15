import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    ModalBody,
    ModalFooter,
    Text,
    Textarea,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnswerReq } from '../../../../api/req'
import { Question } from '../../../../entities/qa'
import { validators } from '../../../../lib/validator/Validators'
import { DefaultModal } from '../../../common/DefaultModal'
import { PrimaryButton } from '../../../common/PrimaryButton'
import { SecondaryButton } from '../../../common/SecondaryButton'

interface Props {
    isOpen: boolean
    onClose: () => void
    question: Question
    isPostLoading: boolean
    postAnswer: (value: AnswerReq) => Promise<void>
}
export const PostFormModal = ({ isOpen, onClose, question, isPostLoading, postAnswer }: Props) => {
    const [contentLength, setContentLength] = useState(0)
    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors, isSubmitting },
    } = useForm<AnswerReq>({
        reValidateMode: 'onChange',
        defaultValues: {
            content: '',
            questionId: question.questionId,
            questionTitle: question.title,
        },
    })

    const countContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContentLength(e.target.value.length)
    }

    const onSubmitAnswer = async (answer: AnswerReq) => {
        await postAnswer(answer)
        resetField('content')
        setContentLength(0)
    }

    return (
        <DefaultModal isOpen={isOpen} onClose={onClose} title="質問回答しますか？">
            <Box w="full" as="form" onSubmit={handleSubmit((data) => onSubmitAnswer(data))}>
                <ModalBody>
                    <FormControl isInvalid={errors.content !== undefined} isRequired>
                        <FormLabel fontWeight={'bold'} fontSize={{ base: 'lg', md: 'lg' }}>
                            内容
                        </FormLabel>
                        <Textarea
                            minH="48"
                            {...register('content', {
                                validate: {
                                    text: validators.requiredForText('解答'),
                                    maxLength: validators.requiredMaxLength('解答', 5000),
                                    minLength: validators.requiredMaxLength('解答', 1),
                                },
                            })}
                            onChange={countContent}
                        ></Textarea>
                    </FormControl>
                    <HStack w="full">
                        <Text>{contentLength} / 5000</Text>
                    </HStack>
                    <FormErrorMessage>{errors.content && errors.content.message}</FormErrorMessage>
                </ModalBody>
                <ModalFooter>
                    <HStack>
                        <SecondaryButton
                            buttonText="キャンセル"
                            onClick={onClose}
                            isLoading={isPostLoading}
                            disabled={isPostLoading}
                            type="button"
                        />
                        <PrimaryButton
                            buttonText="回答する"
                            isLoading={isPostLoading}
                            disabled={isPostLoading}
                            type="submit"
                        ></PrimaryButton>
                    </HStack>
                </ModalFooter>
            </Box>
        </DefaultModal>
    )
}
