import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useBreakpointValue,
} from '@chakra-ui/react'
import React, { Children, ReactNode } from 'react'

interface Props {
    title: string
    isOpen: boolean
    children: ReactNode
    onClose: () => void
}

export const DefaultModal = ({ title, children, isOpen, onClose }: Props): JSX.Element => {
    const modalSize = useBreakpointValue({ base: 'sm', md: 'lg' })

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton color="mainColor" />
                {children}
            </ModalContent>
        </Modal>
    )
}
