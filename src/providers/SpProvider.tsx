import { Box } from '@chakra-ui/react'
import React, { FC } from 'react'
interface Props {
    children: React.ReactNode
}

/** スマホサイズの時のみ表示させたいときラップする */
export const SpProvider = ({ children }: Props) => {
    return <Box display={{ base: 'block', md: 'none' }}>{children}</Box>
}
