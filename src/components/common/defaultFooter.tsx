import { Box, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react"
import Link from "next/link"

const DefaultFooter: Function = () => {
    return (
        <VStack as="footer" bgColor="#FF9037" spacing="0px" w="100%" >
            <Wrap as="nav">
                <WrapItem>
                    <Link href="/">
                        <Box as="a" href="/" whiteSpace="nowrap" fontWeight="700" color="white" fontSize="large" _hover={{ textDecoration:"underline" }} textAlign="center" >About</Box>
                    </Link>
                </WrapItem>
                <WrapItem>
                    <Link href="/rule">
                        <Box as="a" href="/rule" whiteSpace="nowrap" fontWeight="700" color="white" fontSize="large" _hover={{ textDecoration:"underline" }} >利用規約</Box>
                    </Link>
                </WrapItem>
                <WrapItem>
                    <Link href="/privacy">
                        <Box as="a" href="/" whiteSpace="nowrap" fontWeight="700" color="white" fontSize="large" _hover={{ textDecoration:"underline" }} >プライバシー・ポリシー</Box>
                    </Link>
                </WrapItem>
            </Wrap>
            <Text color="#FFDA77" >&copy; 2022 Nexus Square</Text>
        </VStack>
    )
}
export default DefaultFooter