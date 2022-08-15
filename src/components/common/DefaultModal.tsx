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
import React from 'react'

interface Props {
    title: string
    content: string
    isOpen: boolean
    buttonText1: string
    buttonText2: string
    onClose: () => void
}

export const DefaultModal = ({ title, content, isOpen, buttonText1, buttonText2, onClose }: Props): JSX.Element => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{content}</ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        {buttonText1}
                    </Button>
                    <Button variant="ghost">{buttonText2}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
