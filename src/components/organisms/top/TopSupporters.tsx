import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import { Sponser, SPONSERS } from '../../../entities/Sponser'
import Image from 'next/image'

export const TopSupporters = () => {
    return (
        <VStack paddingY={'5%'} paddingX={{ base: '5%', md: '10%' }} spacing="30px">
            <Heading fontSize={'2xl'}>スポンサー企業様</Heading>
            <Stack direction={{ base: 'column', md: 'row' }}>
                <SponserLogo sponser={SPONSERS.mapquest} />
                <SponserLogo sponser={SPONSERS.shinnichi} rate={0.6} />
                <SponserLogo sponser={SPONSERS.tasuki} />
            </Stack>
        </VStack>
    )
}

interface SponserLogoProps {
    sponser: Sponser
    rate?: number
}
const SponserLogo = ({ sponser, rate = 1 }: SponserLogoProps) => {
    return (
        <VStack w={'300px'} h={'150px'} justifyContent={'center'}>
            <Image
                src={sponser.image.logo}
                width={300 * rate}
                height={150 * rate}
                alt={sponser.name}
                key={sponser.name}
            />
        </VStack>
    )
}
