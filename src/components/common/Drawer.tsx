import React, { ReactNode } from 'react'
import {
    Drawer as ChakraDrawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
} from '@chakra-ui/react'

interface Props {
    onClose: () => void
    isOpen: boolean
    children: ReactNode
    headerText: string
}
export const Drawer = ({ onClose, isOpen, children, headerText }: Props) => {
    return (
        <ChakraDrawer onClose={onClose} isOpen={isOpen} size={'full'}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton color={'mainColor'} />
                <DrawerHeader>{headerText}</DrawerHeader>
                <DrawerBody>{children}</DrawerBody>
            </DrawerContent>
        </ChakraDrawer>
    )
}
