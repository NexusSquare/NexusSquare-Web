import { VStack, Text, HStack } from '@chakra-ui/react'
import React from 'react'
import { Modal } from '../../../common/Modal'
import { PrimaryButton } from '../../../common/Button/PrimaryButton'
import { SecondaryButton } from '../../../common/Button/SecondaryButton'

interface Props {
    isOpen: boolean
    onClose: () => void
    onClick: () => void
    isLoading: boolean
}

export const BestAnswerModal = ({ isOpen, onClose, onClick, isLoading }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="ベストアンサーに選びますか？">
            <VStack w="full" spacing={4} p="4">
                <Text w="full">
                    一度選択したベストアンサーは変更することができません。また、投稿された質問は解決済みになります。
                </Text>
                <HStack w="full" justify={'end'}>
                    <SecondaryButton
                        type="button"
                        buttonText="キャンセル"
                        onClick={onClose}
                        disabled={isLoading}
                        isLoading={isLoading}
                    />
                    <PrimaryButton
                        buttonText="ベストアンサーにする"
                        type="button"
                        disabled={isLoading}
                        isLoading={isLoading}
                        onClick={onClick}
                    ></PrimaryButton>
                </HStack>
            </VStack>
        </Modal>
    )
}
