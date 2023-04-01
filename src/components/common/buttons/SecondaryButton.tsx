import { Button } from '@chakra-ui/react'
import React, { MouseEventHandler } from 'react'
interface Props {
    buttonText: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    isLoading?: boolean
    type: 'submit' | 'button'
    width?: string | number
    disabled?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg'
    borderRadius?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | 'full'
}

export const SecondaryButton = ({
    buttonText,
    onClick,
    isLoading,
    type,
    width,
    disabled,
    size,
    borderRadius = 'sm',
}: Props) => {
    return (
        <Button
            isLoading={isLoading}
            onClick={onClick}
            color="mainColor"
            bgColor="white"
            borderWidth={1}
            borderColor="mainColor"
            _hover={{ bgColor: 'mainColor', color: 'white' }}
            type={type}
            width={width}
            isDisabled={disabled}
            size={size}
            borderRadius={borderRadius}
        >
            {buttonText}
        </Button>
    )
}
