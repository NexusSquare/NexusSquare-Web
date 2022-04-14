import { BellIcon } from "@chakra-ui/icons";
import { baseStyle, Box, Button, chakra, ChakraComponent, HStack, IconButton, Spacer, Stack, StackDivider, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ReactNode } from "react";
import ChakraNextImage from "./chakraNextImage";
import { useSession,signIn,signOut } from "next-auth/react";
import { memo } from "react";

interface Props{
    children?: ReactNode,
    isLogined: boolean
}
interface headerFuncProps{
    url: string,
    isComp: boolean,
    funcName: string
}
const Header  = ({children}: Props) :JSX.Element => {
    
    const LOGO_URL: string = "/images/logo.jpg"
    const ICON_IMAGE_URL: string = (process.env.DEFAULT_PROFILE_IMAGE_PATH) ? process.env.DEFAULT_PROFILE_IMAGE_PATH : ""
    const [isLogined,setIsLogined] = useState(false)
    const [isNotice,setIsNotice] = useState(false)
    const HeaderFunction: React.VFC<headerFuncProps> = (props) => {
        return (
            (props.isComp) ? (
                <Link href={props.url} passHref>
                    <Box as="a" href={props.url} paddingTop="10px" whiteSpace="nowrap" fontWeight="700" color="white" fontSize="large" _hover={{ textDecoration: "underline" }} >{props.funcName}</Box>
                </Link>
            ) : (
                <Box whiteSpace="nowrap" paddingTop="10px" onClick={() => alert("今後実装予定！お楽しみに！")} _hover={{ cursor: "pointer",textDecoration: "underline" }} fontWeight="700" color="white" fontSize="large">{props.funcName}</Box>
            )
        )
    }
    const NotificateButton = () => (
        (isNotice) ?
        (
            <Box>
                <IconButton aria-label="通知" icon={<BellIcon viewBox="0 0 25 25" boxSize="30px" color="white" />} bgColor="#FF9037" _hover={{ bgColor: "#FF9037" }} _active={{ bgColor: "#FF9037", outline: "none"}} _focus={{ outline: "none" }} />
            </Box>
        ) : (
            <Box position="relative" >
                <IconButton aria-label="通知" icon={<BellIcon viewBox="0 0 24 24" boxSize="30px" color="white" />} bgColor="#FF9037" _hover={{ bgColor: "#FF9037" }} _active={{ bgColor: "#FF9037", outline: "none"}} _focus={{ outline: "none" }} />
                <Box position="absolute" bgColor="red" borderRadius="50%" boxSize="12px" top="5px" left="20px" _hover={{ cursor: "pointer" }} >
                </Box>
            </Box>
        )
    )
    const LoginOrProfile = () => (
        (isLogined) ? (
            <HStack spacing="10%" w="105px"  >
                <NotificateButton />
                <Box width="40px" height="40px" >
                    <ChakraNextImage src={ICON_IMAGE_URL} alt="プロフィール" borderRadius="50%" width={50} height={50}></ChakraNextImage>
                </Box>
            </HStack>
        ) : (
            <HStack spacing="10%" w="200px" justify="end" >
                <Button onClick={() => signIn()}>新規登録</Button>
                <Link href="/login" passHref>
                    <Box as="a" href="/login" h="40px" w="85px" padding="8px 10px" fontWeight="semibold" bgColor="#FFDA77" borderRadius="10px" _hover= {{ opacity:"50%" }} _active={{ opacity:"50%",outline:"none" }} _focus={{ outline: "none" }} >ログイン</Box>
                </Link>
            </HStack>
        )
    )

    return  (
        <VStack as="header" w="100%" bgColor="#FF9037" spacing="0px" divider={<StackDivider borderColor="#FFDA77" />} position="fixed" top="0" zIndex={"sticky"}>
            <HStack h="60px" paddingX={{ base:"10px", sm:"50px" }} paddingY={{ base:"0px", md:"10px" }} w="100%" bgColor="#FF9037" >
                <Box as="h1" display="flex" flexDirection="row" alignItems="center" marginX={{ base:"0px",xs:"10px" }} >
                    <Link href="/" passHref>
                        <Box as="a" href="/" display="flex" flexDirection="row" alignItems="center" >
                            <ChakraNextImage src={LOGO_URL} alt="ロゴ" minW="150px" minH="30px" maxW="225px" maxH="45px" width={225} height={45} borderColor="#FF9037" ></ChakraNextImage>
                        </Box>
                    </Link>
                </Box>
                
                <HStack as="nav" spacing="12%" paddingX="0.5%" aria-labelledby="jump to other functions" display={{ base:"none",md:"flex" }}>
                    <HeaderFunction url="/qa" funcName="学生生活Q&A" isComp={true} />
                    <HeaderFunction url="#" funcName="授業口コミ" isComp={false} />
                </HStack>
                <Spacer/>
                <LoginOrProfile />
            </HStack>
            <HStack as="nav" spacing="12%" paddingY="0px" paddingX={{ base:"10px",sm:"50px" }} aria-labelledby="jump to other functions - mini version" display={{ base:"flex",md:"none" }} alignSelf="start" >
                <HeaderFunction url="/qa" funcName="学生生活Q&A" isComp={true} />
                <HeaderFunction url="#" funcName="授業口コミ" isComp={false} />
            </HStack>
        </VStack>
    )
}

export default memo(Header)