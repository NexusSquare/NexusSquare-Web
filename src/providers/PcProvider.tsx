import { Box } from '@chakra-ui/react'
import React, { FC } from 'react'

interface Props {
    children: React.ReactNode
}
/** PCサイズの時のみ表示させたいときラップする */
export const PcProvider: FC<Props> = ({ children }) => {
    return <Box display={{ base: 'none', md: 'block' }}>{children}</Box>
}
