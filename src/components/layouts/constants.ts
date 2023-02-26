export const HEADER_HEIGHT = '56px'
export const SP_HEADER_HEIGHT = '96px'

// width
export const LEFT_BAR_WIDTH = 'calc((100vw - 640px) / 2)'
export const RIGHT_BAR_WIDTH = 'calc((100vw - 640px) / 2)'
export const RIGHT_BAR_MINI_WIDTH = '300px'

export const MAIN_CONTENT_WIDTH = {
    base: '100%',
    md: `calc(100vw - ${RIGHT_BAR_MINI_WIDTH})`,
    xl: `calc(100vw - ${LEFT_BAR_WIDTH} - ${RIGHT_BAR_WIDTH} )`,
}

// height
export const LEFT_BAR_HEIGHT = '100vh'
export const RIGHT_BAR_HEIGHT = '100vh'

export const LEFT_MARGIN = { base: 0, xl: LEFT_BAR_WIDTH }
export const RIGHT_MARGIN = { base: 0, xl: LEFT_BAR_WIDTH }
