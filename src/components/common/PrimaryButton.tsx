import { Button } from '@chakra-ui/react'
import React from 'react'
interface Props {
    buttonText: string
    onClick: () => void
}
export const PrimaryButton = ({ buttonText, onClick }: Props) => {
    return (
        <Button color="white" bgColor="mainColor" _hover={{ bgColor: 'subSubColor' }} onClick={onClick}>
            {buttonText}
        </Button>
    )
}
