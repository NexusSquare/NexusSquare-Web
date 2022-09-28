import { Button } from '@chakra-ui/react'
import React, { MouseEventHandler } from 'react'
interface Props {
    buttonText: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    isLoading?: boolean
    type: 'submit' | 'button'
    width?: string | number
    disabled?: boolean
}
export const PrimaryButton = ({ buttonText, onClick, isLoading, type, width, disabled }: Props) => {
    return (
        <Button
            isLoading={isLoading}
            color="white"
            bgColor="mainColor"
            _hover={{ bgColor: 'subSubColor' }}
            onClick={onClick}
            type={type}
            width={width}
            disabled={disabled}
        >
            {buttonText}
        </Button>
    )
}
