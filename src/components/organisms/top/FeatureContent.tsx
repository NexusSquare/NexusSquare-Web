import React, { ReactNode } from 'react'
import { Box, Heading, HStack, VStack, Text, useBreakpointValue, Stack, Spacer } from '@chakra-ui/react'
import Image from 'next/image'
interface FeatureContentProps {
    heading: string
    text: string
    isReversed: boolean
    children: ReactNode
    imageSrc: string
}

export const FeatureContent = (props: FeatureContentProps) => {
    const direction = props.isReversed ? 'row-reverse' : 'row'
    return (
        <Stack direction={{ base: 'column', md: direction }} spacing="30px">
            <VStack w={{ base: '100%', md: '50%' }} justifyContent="center">
                <Image width={220} height={380} src={props.imageSrc} alt={'サービスの画像'} />
            </VStack>
            <VStack w={{ base: '100%', md: '50%' }} spacing="30px" alignSelf="center">
                <Heading w="full" borderLeft={'5px solid'} borderColor="primary" padding={'10px 12px'} fontSize="xl">
                    {props.heading}
                    <Box as="span" paddingLeft="10px" h="full">
                        {props.children}
                    </Box>
                </Heading>
                <Text>{props.text}</Text>
            </VStack>
        </Stack>
    )
}
