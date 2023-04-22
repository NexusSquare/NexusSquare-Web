import { Box, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { BsQuestionCircle } from 'react-icons/bs'

interface Props {
    description: string
}

export const QuestionPopover = ({ description }: Props) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Box as="button">
                    <BsQuestionCircle size={12} />
                </Box>
            </PopoverTrigger>
            <PopoverContent
                style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                }}
                color="white"
            >
                <PopoverBody>{description}</PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
