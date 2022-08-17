import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import React, { Children, ReactNode } from 'react'

interface Props {
    title: string
    isOpen: boolean
    children: ReactNode
    onClose: () => void
}

export const DefaultModal = ({ title, children, isOpen, onClose }: Props): JSX.Element => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton color="mainColor" />
                {children}
            </ModalContent>
        </Modal>
    )
}
