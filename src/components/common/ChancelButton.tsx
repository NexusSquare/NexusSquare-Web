import { Button } from '@chakra-ui/react'
import React from 'react'

interface Props {
    buttonText: string
    onClick: () => void
}
export const ChancelButton = ({ buttonText, onClick }: Props) => {
    return (
        <Button
            color="mainColor"
            bgColor="white"
            borderWidth={1}
            borderColor="mainColor"
            _hover={{ bgColor: 'mainColor', color: 'white' }}
            onClick={onClick}
        >
            {buttonText}
        </Button>
    )
}
