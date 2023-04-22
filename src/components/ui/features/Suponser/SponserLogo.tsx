import { Link, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { Sponser } from '../../../../entities/Sponser'

interface SponserLogoProps {
    sponser: Sponser
}
export const SponserLogo = ({ sponser }: SponserLogoProps) => {
    const rate = sponser.image.rate ?? 1
    return (
        <VStack w={'300px'} h={'150px'} justifyContent={'center'}>
            <Link isExternal href={sponser.urls.logo}>
                <Image
                    src={sponser.image.logo}
                    width={300 * rate}
                    height={150 * rate}
                    alt={sponser.name}
                    key={sponser.name}
                />
            </Link>
        </VStack>
    )
}
