import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'
import { advertisement } from '../../entities/Advertisement'
import { SPONSERS } from '../../entities/Sponser'
import QAButton from '../common/Button/QAButton'
import { SponserBanner } from '../common/suponser/Banner'
import { RIGHT_BAR_HEIGHT, RIGHT_BAR_MINI_WIDTH, RIGHT_BAR_WIDTH } from './constants'

interface Props {
    children?: ReactNode
}

const sponsers = advertisement.getSome(2)

export const RightBar = ({ children }: Props): JSX.Element => {
    return (
        <VStack as="aside" bgColor="subColor" h={RIGHT_BAR_HEIGHT} w={RIGHT_BAR_WIDTH} minW={RIGHT_BAR_MINI_WIDTH}>
            <VStack spacing={2} margin="30px 10px">
                {sponsers.map((ad, i) => {
                    return <SponserBanner sponser={ad} key={i} />
                })}
            </VStack>
            <QAButton />
        </VStack>
    )
}
