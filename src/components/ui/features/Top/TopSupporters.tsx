import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import { Sponser, SPONSERS } from '../../../../entities/Sponser'
import Image from 'next/image'
import { SponserLogo } from '../Suponser/SponserLogo'
import { advertisement } from '../../../../entities/Advertisement'

export const TopSupporters = () => {
    return (
        <VStack paddingY={'5%'} paddingX={{ base: '5%', md: '10%' }} spacing="30px">
            <Heading fontSize={'2xl'}>スポンサー企業様</Heading>
            <Stack direction={{ base: 'column', md: 'row' }}>
                {advertisement.getAll().map((ad, i) => {
                    return <SponserLogo sponser={ad} key={i} />
                })}
            </Stack>
        </VStack>
    )
}
