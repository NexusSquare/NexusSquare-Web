import { Button } from '@chakra-ui/react'
import React, { MouseEventHandler } from 'react'
interface Props {
    buttonText: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    isLoading?: boolean
    type?: 'submit' | 'button'
    width?: string | number
    disabled?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg'
    borderRadius?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | 'full'
}
export const PrimaryButton = ({
    buttonText,
    onClick,
    isLoading,
    type = 'button',
    width,
    disabled,
    size,
    borderRadius = 'sm',
}: Props) => {
    return (
        <Button
            isLoading={isLoading}
            color="white"
            bgColor="primary"
            _hover={{ bgColor: 'primaryDark' }}
            onClick={onClick}
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
