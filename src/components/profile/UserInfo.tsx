import {
    HStack,
    VStack,
    Text,
    TabList,
    Tabs,
    Tab,
    TabPanels,
    TabPanel,
    Box,
    Button,
    Avatar,
    WrapItem,
} from '@chakra-ui/react'
import { AiFillCamera } from 'react-icons/ai'
import React from 'react'
import ChakraNextImage from '../common/chakraNextImage'

export const UserInfo = () => {
    const POINT_IMAGE_PATH: string = '/images/point.png'
    const DEFAULT_AVATAR_URL: string = 'https://bit.ly/broken-link'
    return (
        <>
            <HStack
                bgColor="subColor"
                w="full"
                border="1px"
                borderColor="gray.400"
                borderRadius="sm"
                boxShadow="md"
                justifyContent="space-evenly"
                py="0"
            >
                <Box
                    w={{ base: '100px', md: '150px' }}
                    h={{ base: '100px', md: '150px' }}
                    top={{ base: '-5', md: '-10' }}
                    position="relative"
                >
                    <Avatar width="full" height="full" src={DEFAULT_AVATAR_URL} />
                    <Box
                        boxSize={{ base: '8', md: '10' }}
                        position="absolute"
                        bottom="0"
                        right="0"
                        opacity={'0.6'}
                        as="button"
                    >
                        <AiFillCamera size={'full'} />
                    </Box>
                </Box>
                <VStack>
                    <HStack>
                        <Box>
                            <Text>みょうじ</Text>
                            <Text fontWeight="bold" fontSize={{ base: '2xl', md: '3xl' }}>
                                苗字
                            </Text>
                        </Box>
                        <Box>
                            <Text>たろう</Text>
                            <Text fontWeight="bold" fontSize={{ base: '2xl', md: '3xl' }}>
                                太郎
                            </Text>
                        </Box>
                    </HStack>
                    <Text>外国語学部英米学科</Text>
                </VStack>
                <VStack height={'full'}>
                    <Text fontSize={{ base: 'xl', md: '2xl' }}>1学年</Text>
                </VStack>
            </HStack>
            <VStack
                bgColor="subColor"
                border="2px"
                borderRadius="lg"
                borderColor="mainColor"
                py="2"
                px={{ base: '16', md: '32' }}
                spacing="1"
                boxShadow="md"
            >
                <HStack>
                    <Text textColor="mainColor" fontWeight="bold" fontSize={{ base: 'xl', md: '3xl' }} pr="2">
                        保有ポイント
                    </Text>
                    <ChakraNextImage src={POINT_IMAGE_PATH} alt={'ポイント'} width={25} height={25} pt="4" />
                </HStack>
                <HStack fontSize={{ base: '2xl', md: '6xl' }} fontWeight={{ base: 'bold', md: 'normal' }}>
                    <Text>1500</Text>
                    <Text>pt</Text>
                </HStack>
            </VStack>
        </>
    )
}
