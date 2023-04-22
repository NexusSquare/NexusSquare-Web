import React from 'react'
import { Textarea as CTextarea, TextareaProps, forwardRef } from '@chakra-ui/react'

export const Textarea = forwardRef<TextareaProps, 'textarea'>((props, ref) => {
    return <CTextarea {...props} focusBorderColor={'primary'} rounded={'sm'} ref={ref} />
})
