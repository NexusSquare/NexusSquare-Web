import { Button } from '@chakra-ui/react'
import React from 'react'

interface Props {
    buttonText: string
    onClick: () => void
    isLoading?: boolean
}
export const ChancelButton = ({ buttonText, onClick, isLoading }: Props) => {
    return (
        <Button
            isLoading={isLoading}
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
