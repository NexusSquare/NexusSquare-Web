import { Button, FormControl, FormLabel, HStack, VStack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Modal } from '../../common/Modal'
import QACategories from '../../../constants/qa/qaCategories'
import { SecondaryButton } from '../../common/Button/SecondaryButton'
import { ReportReq } from '../../../api/req/ReportReq'
import { PrimaryButton } from '../../common/Button/PrimaryButton'
import { Textarea } from '../../common/Textarea'

interface Props {
    isOpen: boolean
    onClose: () => void
    onClickReport: (value: ReportReq) => void
    isReportLoading: boolean
    postId: string
    type: 'question' | 'answer'
}

type QACategoriesType = typeof QACategories
type QACategories = (typeof QACategories)[keyof QACategoriesType]

export const ReportFormModal = ({ isOpen, onClose, onClickReport, isReportLoading, type, postId }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ReportReq>({
        reValidateMode: 'onChange',
        defaultValues: {
            reason: '',
            type: type,
            postId: postId,
        },
    })
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="質問を通報しますか？">
            <VStack w="full" spacing={4} p="4" as="form" onSubmit={handleSubmit((data) => onClickReport(data))}>
                <FormControl isInvalid={errors.reason !== undefined} isRequired>
                    <FormLabel fontWeight={'bold'} fontSize={{ base: 'lg', md: 'lg' }}>
                        理由
                    </FormLabel>
                    <Textarea
                        minH="48"
                        {...register('reason', {
                            required: 'This is required',
                            minLength: { value: 1, message: '質問は最小1文字必要です' },
                            maxLength: { value: 5000, message: '質問本文は5000文字までです。' },
                        })}
                    ></Textarea>
                </FormControl>
                <HStack w="full" justify={'end'}>
                    <SecondaryButton
                        type="button"
                        buttonText="キャンセル"
                        onClick={onClose}
                        disabled={isReportLoading}
                        isLoading={isReportLoading}
                    />
                    <PrimaryButton
                        buttonText="通報する"
                        type="submit"
                        disabled={isReportLoading}
                        isLoading={isReportLoading}
                    ></PrimaryButton>
                </HStack>
            </VStack>
        </Modal>
    )
}
