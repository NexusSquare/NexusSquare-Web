import { extendTheme } from '@chakra-ui/react'

export const chakraTheme = extendTheme({
    colors: {
        mainColor: '#FF9037',
        subColor: '#fffdfa',
        subSubColor: '#FFDA77',
        accentColor: '#3DB2FF',
        textPrimary: '#1A202C',
        textGray: '#A0AEC0',
    },
    styles: {
        global: {
            html: { height: '100%' },
            body: { height: '100%' },
        },
    },
})
