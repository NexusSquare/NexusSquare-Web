import { forwardRef, Input as CInput, InputProps } from '@chakra-ui/react'
import React from 'react'

export const Input = forwardRef<InputProps, 'input'>((props, ref) => {
    return <CInput {...props} focusBorderColor={'primary'} rounded={'sm'} ref={ref} />
})
