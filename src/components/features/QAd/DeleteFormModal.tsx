import { HStack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Modal } from '../../../common/Modal'
import { SecondaryButton } from '../../../common/Button/SecondaryButton'
import { PrimaryButton } from '../../../common/Button/PrimaryButton'

interface Props {
    isOpen: boolean
    onClose: () => void
    onClickDelete: () => void
    isDeleteLoading: boolean
}

export const DeleteFormModal = ({ isOpen, onClose, onClickDelete, isDeleteLoading }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="投稿を削除しますか？">
            <VStack w="full" spacing={4} p="4">
                <Text w="full">
                    一度削除した投稿は元に戻すことはできません。また、投稿されたポイントは削除されます。
                </Text>
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
                        onClick={onClickDelete}
                    ></PrimaryButton>
                </HStack>
            </VStack>
        </Modal>
    )
}
