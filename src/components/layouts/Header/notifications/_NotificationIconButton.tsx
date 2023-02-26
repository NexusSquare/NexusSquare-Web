import { BellIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import React from 'react'

export const NotificationIconButton = () => {
    return (
        <IconButton
            aria-label="通知"
            icon={<BellIcon viewBox="0 0 25 25" boxSize="30px" color="white" />}
            bgColor="#FF9037"
            _hover={{ bgColor: '#FF9037' }}
            _active={{ bgColor: '#FF9037', outline: 'none' }}
            _focus={{ outline: 'none' }}
        />
    )
}
