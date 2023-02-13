import { Box } from '@chakra-ui/react'
import React, { FC } from 'react'

/** スマホサイズの時のみ表示させたいときラップする */
export const SpProvider: FC = ({ children }) => {
    return <Box display={{ base: 'block', md: 'none' }}>{children}</Box>
}
