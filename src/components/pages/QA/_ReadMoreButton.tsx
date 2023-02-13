import { Button } from '@chakra-ui/react'

interface ReadMoreButtonProps {
    onClick: () => void
    isLoading?: boolean
}
export const ReadMoreButton = ({ onClick, isLoading }: ReadMoreButtonProps) => {
    return (
        <Button
            w="100%"
            onClick={onClick}
            bg="white"
            width="full"
            border={'1px'}
            borderColor="gray.300"
            rounded={'none'}
            isLoading={isLoading}
            disabled={isLoading}
        >
            さらに読み込む
        </Button>
    )
}
