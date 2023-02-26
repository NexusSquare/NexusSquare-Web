import { Box } from '@chakra-ui/react'
import React, { FC } from 'react'

/** PCサイズの時のみ表示させたいときラップする */
export const PcProvider: FC = ({ children }) => {
    return <Box display={{ base: 'none', md: 'block' }}>{children}</Box>
}
