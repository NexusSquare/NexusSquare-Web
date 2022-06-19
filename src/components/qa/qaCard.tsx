import { Box, Button, HStack, Spacer, Text, VStack } from "@chakra-ui/react"
import Link from "next/link"
import question from "../../types/domain/qa/question"
import ChakraNextImage from "../common/chakraNextImage"

const QACard: React.VFC<question> = (props) => {
    const QA_IMAGE_PATH: string = "/images/ans.png"
    const REGEX: RegExp = /^([1-9][0-9]{3})\-0*([1-9]|1[0-2])\-0*([1-9]|[1-2][0-9]|3[01])/
    const result = props.createAt.toString().match(REGEX)
    const date: string = (result) ? result[1] + "年" + result[2] + "月" + result[3] + "日" : "読み込めませんでした"
    const categoryText:string = (props.category2) ? `${props.category1}、${props.category2}` : props.category1

    return (
        <Link href={"/qa/" + props.id} passHref>
            <Box as="a" href={"/qa/" + props.id}>
                <Box as="section" w="100%" padding="10px 20px" border="1px" borderColor="gray.300" _hover={{ opacity:"50%" }} >
                    <HStack>
                        <Text color="gray.400">{categoryText}</Text>
                        <Spacer />
                        <Text color="gray.400">{date}</Text>
                    </HStack>
                    <Text as="h3" paddingTop="10px" fontSize="2xl" fontWeight="bold" isTruncated>{props.title}</Text>
                    <Text paddingBottom="15px" color="gray.400" isTruncated>by {props.postedBy}</Text>
                    <Text marginX="5px" width="100%" maxWidth="100%" minWidth="100%" overflowWrap="break-word" noOfLines={3} >{props.content}</Text>
                    <HStack paddingTop="10px">
                        <Spacer/>
                        <ChakraNextImage src={QA_IMAGE_PATH} alt="回答数" width={25} height={25} minW="25px" minH="25px" />
                        <Text>{props.ansNum}</Text>
                    </HStack>
                </Box>
            </Box>
        </Link>
    )
}

export default QACard