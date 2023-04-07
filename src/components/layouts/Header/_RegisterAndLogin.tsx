import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { FiLogIn, FiUserPlus } from 'react-icons/fi'
import { PcProvider } from '../../../providers/PcProvider'
import { SpProvider } from '../../../providers/SpProvider'

interface Props {
    onClickRegister: () => void
    onClickLogin: () => void
}

export const RegisterAndLogin = ({ onClickRegister, onClickLogin }: Props) => {
    return (
        <>
            <PcRegisterAndLogin onClickRegister={onClickRegister} onClickLogin={onClickLogin} />
            <SpRegisterAndLogin onClickRegister={onClickRegister} onClickLogin={onClickLogin} />
        </>
    )
}

const PcRegisterAndLogin = ({ onClickRegister, onClickLogin }: Props) => {
    return (
        <PcProvider>
            <HStack spacing={4}>
                <Button
                    type="button"
                    color="white"
                    bgColor="primary"
                    borderWidth={2}
                    borderColor="white"
                    _hover={{ bgColor: 'white', color: 'primary' }}
                    onClick={onClickRegister}
                    borderRadius="sm"
                >
                    新規登録
                </Button>
                <HStack as="button" spacing={1} _hover={{ color: 'primary' }}>
                    <FiLogIn size={30} color={'white'} />
                    <Text
                        fontSize={'md'}
                        color={'white'}
                        w="full"
                        fontWeight={'bold'}
                        _hover={{ textDecoration: 'underline' }}
                        onClick={onClickLogin}
                    >
                        ログイン
                    </Text>
                </HStack>
            </HStack>
        </PcProvider>
    )
}

const SpRegisterAndLogin = ({ onClickRegister, onClickLogin }: Props) => {
    return (
        <SpProvider>
            <HStack spacing={2}>
                <VStack as="button" _hover={{ color: 'primary' }} spacing={1} justify={'center'} alignItems={'center'}>
                    <FiUserPlus size={20} color={'white'} />
                    <Text fontSize={'10px'} color={'white'} fontWeight={'bold'} onClick={onClickRegister}>
                        新規登録
                    </Text>
                </VStack>
                <VStack as="button" spacing={1} onClick={onClickLogin}>
                    <FiLogIn size={20} color={'white'} />
                    <Text fontSize={'10px'} color={'white'} fontWeight={'bold'}>
                        ログイン
                    </Text>
                </VStack>
            </HStack>
        </SpProvider>
    )
}
