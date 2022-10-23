import React, { ReactNode } from 'react'
import { Box, Heading, HStack, VStack, Text, useBreakpointValue, Stack, Spacer } from '@chakra-ui/react'
import ChakraNextImage from '../../common/chakraNextImage'
import { RiQuestionAnswerLine } from 'react-icons/ri'
interface FeatureContentProps {
    heading: string
    text: string
    isReversed: boolean
    children: ReactNode
}

export const FeatureContent = (props: FeatureContentProps) => {
    const direction = props.isReversed ? 'row-reverse' : 'row'
    return (
        <Stack direction={{ base: 'column', md: direction }} spacing="30px">
            <VStack w={{ base: '100%', md: '50%' }} justifyContent="center">
                <Box w="220px" h="380px" bgColor="gray.200">
                    サービスの画像が入ります
                </Box>
            </VStack>
            <VStack w={{ base: '100%', md: '50%' }} spacing="30px" alignSelf="center">
                <Heading w="full" borderLeft={'5px solid'} borderColor="mainColor" padding={'10px 12px'} fontSize="3xl">
                    {props.heading}
                    <Box as="span" paddingLeft="10px" h="full">
                        {props.children}
                    </Box>
                </Heading>
                <Text lineHeight="200%">{props.text}</Text>
            </VStack>
        </Stack>
    )
}
