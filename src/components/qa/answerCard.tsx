import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import answer from '../../types/domain/qa/answer'
import ChakraNextImage from '../../components/common/chakraNextImage'

const AnswerCard: React.VFC<answer> = (props) => {
    const DEFAULT_ICON_IMAGE_PATH: string = (process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE_PATH) ? `/images/${process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE_PATH}` : ""
    const userImage: string = (props.userIcon) ? props.userIcon : DEFAULT_ICON_IMAGE_PATH
    return (
        <VStack>
            <HStack>
                <Box as="figure" width="30px" height="30px" >
                    <ChakraNextImage src={userImage} alt="回答者アイコン" borderRadius="50%" width={30} height={30} />
                </Box>
                <VStack spacing="0px">
                    <Text fontWeight="400">{props.postedby}</Text>
                    <HStack>
                        <Text fontWeight="400" fontSize="sm" color="gray.400">作成日:{props.createAt}</Text>
                    </HStack>
                    <Text>{props.content}</Text>
                </VStack>
            </HStack>
        </VStack>
    )
}
export default AnswerCard