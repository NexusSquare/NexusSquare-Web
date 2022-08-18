import { Button } from '@chakra-ui/react'
import React from 'react'
interface Props {
    buttonText: string
    onClick: () => void
    isLoading?: boolean
}
export const PrimaryButton = ({ buttonText, onClick, isLoading }: Props) => {
    return (
        <Button
            isLoading={isLoading}
            color="white"
            bgColor="mainColor"
            _hover={{ bgColor: 'subSubColor' }}
            onClick={onClick}
        >
            {buttonText}
        </Button>
    )
}
