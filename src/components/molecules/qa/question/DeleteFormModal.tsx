import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Text,
    Textarea,
    Select,
    VStack,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ChancelButton } from '../../../common/ChancelButton'
import { DefaultModal } from '../../../common/DefaultModal'
import { Question } from '../../../../types/domain/qa'
import QACategories from '../../../../constants/qa/qaCategories'
import { QuestionReq } from '../../../../types/api/req'
import { SecondaryButton } from '../../../common/SecondaryButton'
import { PrimaryButton } from '../../../common/PrimaryButton'

interface Props {
    isOpen: boolean
    onClose: () => void
    onClickDeleteQuestion: () => void
    isDeleteLoading: boolean
}

type QACategoriesType = typeof QACategories
type QACategories = typeof QACategories[keyof QACategoriesType]

export const DeleteFormModal = ({ isOpen, onClose, onClickDeleteQuestion, isDeleteLoading }: Props) => {
    return (
        <DefaultModal isOpen={isOpen} onClose={onClose} title="質問を削除しますか？">
            <VStack w="full" spacing={4} p="4">
                <Text w="full">一度削除した質問は元に戻すことはできません</Text>
                <HStack w="full" justify={'end'}>
                    <SecondaryButton
                        type="button"
                        buttonText="キャンセル"
                        onClick={onClose}
                        disabled={isDeleteLoading}
                        isLoading={isDeleteLoading}
                    />
                    <PrimaryButton
                        buttonText="削除する"
                        type="button"
                        disabled={isDeleteLoading}
                        isLoading={isDeleteLoading}
                        onClick={onClickDeleteQuestion}
                    ></PrimaryButton>
                </HStack>
            </VStack>
        </DefaultModal>
    )
}
