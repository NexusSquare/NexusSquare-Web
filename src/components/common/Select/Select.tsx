import React from 'react'
import { Select as CSelect, SelectProps, forwardRef } from '@chakra-ui/react'

export const Select = forwardRef<SelectProps, 'select'>((props, ref) => {
    return <CSelect {...props} focusBorderColor={'primary'} rounded={'sm'} ref={ref} />
})
