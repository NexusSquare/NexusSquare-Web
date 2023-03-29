import { Box, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { Sponser } from '../../../entities/Sponser'

interface Props {
    sponser: Sponser
    width?: number
    height?: number
    rate?: number
}
export const SponserBanner = ({ sponser, width = 200, height = 200, rate = 1 }: Props): JSX.Element => {
    return (
        <VStack
            width={width}
            height={height}
            bg={'white'}
            justifyContent={'center'}
            border={'1px'}
            borderColor={'gray.200'}
        >
            <Image
                src={sponser.image.banner}
                width={width * rate}
                height={height * rate}
                alt={sponser.name}
                key={sponser.name}
            />
        </VStack>
    )
}
