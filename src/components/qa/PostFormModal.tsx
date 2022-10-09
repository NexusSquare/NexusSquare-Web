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
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ChancelButton } from '../common/ChancelButton'
import { DefaultModal } from '../common/DefaultModal'

interface Props {
    isOpen: boolean
    onClose: () => void
}
export const PostFormModal = ({ isOpen, onClose }: Props) => {
    const [contentLength, setContentLength] = useState(0)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm()

    const countContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContentLength(e.target.value.length)
    }
    return (
        <DefaultModal isOpen={isOpen} onClose={onClose} title="質問回答しますか？">
            <Box w="full" as="form" onSubmit={handleSubmit((data) => console.log(data))}>
                <ModalBody>
                    <FormControl isInvalid={errors.content !== undefined}>
                        <FormLabel fontSize={{ base: 'lg', md: 'xl' }}>
                            <HStack>
                                <Text>内容</Text>
                            </HStack>
                        </FormLabel>
                        <Textarea
                            minH="48"
                            {...register('content', {
                                required: 'This is required',
                                minLength: { value: 1, message: '質問は最小1文字必要です' },
                                maxLength: { value: 5000, message: '質問本文は5000文字までです。' },
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
                        <ChancelButton buttonText="キャンセル" onClick={onClose} />
                        <Button
                            isLoading={isSubmitting}
                            color="white"
                            bgColor="mainColor"
                            _hover={{ bgColor: 'subSubColor' }}
                            type="submit"
                        >
                            回答する
                        </Button>
                    </HStack>
                </ModalFooter>
            </Box>
        </DefaultModal>
    )
}
