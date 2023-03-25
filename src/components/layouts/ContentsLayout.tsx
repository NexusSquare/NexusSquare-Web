import { Box } from '@chakra-ui/react'
import React, { ReactChild } from 'react'
import { HEADER_HEIGHT, LEFT_MARGIN, MAIN_CONTENT_WIDTH, RIGHT_MARGIN } from './constants'
import { Footer } from './Footer'
import { RightBar } from './RightBar'

interface Props {
    children: ReactChild
    Left: ReactChild
}

export const ContentsLayout = ({ children, Left }: Props) => {
    return (
        <>
            <Box position={'fixed'} display={{ base: 'none', xl: 'block' }} left="0" top={HEADER_HEIGHT}>
                {Left}
            </Box>
            <Box position={'fixed'} display={{ base: 'none', md: 'block' }} right="0" top={HEADER_HEIGHT}>
                <RightBar />
            </Box>
            <Box w={MAIN_CONTENT_WIDTH} ml={LEFT_MARGIN}>
                {children}
            </Box>
        </>
    )
}
