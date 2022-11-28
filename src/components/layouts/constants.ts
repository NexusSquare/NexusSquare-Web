export const HEADER_HEIGHT = '56px'

// width
export const LEFT_BAR_WIDTH = 'calc((100vw - 640px) / 2)'
export const RIGHT_BAR_WIDTH = 'calc((100vw - 640px) / 2)'
export const RIGHT_BAR_MINI_WIDTH = '300px'

export const MAIN_CONTENT_WIDTH = {
    base: '100%',
    md: `calc(100vw - ${RIGHT_BAR_MINI_WIDTH})`,
    xl: `calc(100vw - ${LEFT_BAR_WIDTH} )`,
}

// height
export const LEFT_BAR_HEIGHT = `calc(100vh - ${HEADER_HEIGHT})`
export const RIGHT_BAR_HEIGHT = `calc(100vh - ${HEADER_HEIGHT})`

export const MAIN_CONTENT_PADDING_LEFT = { base: 0, xl: LEFT_BAR_WIDTH }
export const MAIN_CONTENT_PADDING_RIGHT = 0
