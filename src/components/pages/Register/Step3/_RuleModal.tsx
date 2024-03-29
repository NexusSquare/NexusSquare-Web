import { VStack, Text, HStack } from '@chakra-ui/react'
import React, { ChangeEvent, LegacyRef, useEffect, useState } from 'react'
import { Modal } from '../../../ui/common/Modal'
import { PrimaryButton } from '../../../ui/common/Button/PrimaryButton'
import { SecondaryButton } from '../../../ui/common/Button/SecondaryButton'
import { RuleBody } from '../../../ui/features/Rule/RuleBody'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { Checkbox } from '../../../ui/common/Checkbox'

interface Props {
    isOpen: boolean
    onClose: () => void
    onClick: () => void
    isLoading: boolean
}

export const RuleModal = ({ isOpen, onClose, onClick, isLoading }: Props) => {
    const [isRead, setIsRead] = useState(false)

    const scrollRef = useBottomScrollListener<HTMLDivElement>(() => {
        setIsRead(true)
    })

    const onCloseModal = () => {
        setIsRead(false)
        onClose()
    }
    return (
        <Modal isOpen={isOpen} onClose={onCloseModal} title="利用規約に同意しますか？">
            <VStack w="full" spacing={4} p="4">
                <VStack maxH={96} overflow={'scroll'} borderWidth={1} p={2} ref={scrollRef}>
                    <RuleBody />
                </VStack>
                <Checkbox
                    colorScheme="orange"
                    fontWeight={'bold'}
                    alignSelf={'start'}
                    isChecked={isRead}
                    isDisabled={!isRead}
                >
                    本サービスの利用規約に同意する
                </Checkbox>
                <HStack w="full" justify={'end'}>
                    <PrimaryButton
                        buttonText="同意する"
                        type="button"
                        disabled={isLoading || !isRead}
                        isLoading={isLoading}
                        onClick={onClick}
                    ></PrimaryButton>
                </HStack>
            </VStack>
        </Modal>
    )
}
