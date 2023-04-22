import { forwardRef, Checkbox as CCheckbox, CheckboxProps } from '@chakra-ui/react'
import React from 'react'

export const Checkbox = forwardRef<CheckboxProps, 'input'>((props, ref) => {
    return <CCheckbox {...props} colorScheme="orange" ref={ref} />
})
