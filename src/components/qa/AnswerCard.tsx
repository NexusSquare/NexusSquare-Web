import { NotAllowedIcon } from '@chakra-ui/icons'
import { Avatar, Box, HStack, IconButton, Spacer, Text, VStack } from '@chakra-ui/react'
import Answer from '../../types/domain/qa/Answer'

interface Props {
    answer: Answer
}

const AnswerCard = ({ answer }: Props): JSX.Element => {
    const DEFAULT_AVATAR_URL: string = 'https://bit.ly/broken-link'
    const DEFAULT_ICON_IMAGE_PATH: string = process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE_PATH
        ? `/images/${process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE_PATH}`
        : DEFAULT_AVATAR_URL
    const userImage: string = answer.userIcon ? answer.userIcon : DEFAULT_ICON_IMAGE_PATH
    return (
        <VStack p="4" border="1px" w="full" borderColor="gray.200" spacing={4}>
            <HStack w="full">
                <Box as="figure" width="30px" height="30px">
                    <Avatar width="full" height="full" src={userImage} />
                </Box>
                <VStack spacing="0px">
                    <Text fontWeight="400" w="full">
                        {answer.postedby}匿名さん
                    </Text>
                    <Text fontWeight="400" fontSize="sm" color="gray.400">
                        作成日:{answer.createAt}
                    </Text>
                </VStack>
            </HStack>
            <Text>{answer.content}</Text>
            <Spacer />
            <HStack w="100%">
                <Spacer />
                <IconButton aria-label="通報する" icon={<NotAllowedIcon />} variant="outline"></IconButton>
            </HStack>
        </VStack>
    )
}
export default AnswerCard
