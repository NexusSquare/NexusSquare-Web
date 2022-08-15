import { SearchIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    ButtonGroup,
    HStack,
    IconButton,
    Input,
    Popover,
    PopoverAnchor,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import ChakraNextImage from '../common/chakraNextImage'

interface Props {
    children?: ReactNode
}
interface NavButtonProps {
    imageSrc: string
    altText: string
    url: string
}

const QACardWindow: Function = ({ children }: Props): JSX.Element => {
    const CATEGORY_IMAGE_PATH: string = '/images/category.png'
    const ALL_Q_IMAGE_PATH: string = '/images/all.png'
    const RANKING_IMAGE_PATH: string = '/images/crown.png'
    const router = useRouter()
    const NavButton: React.VFC<NavButtonProps> = (props) => (
        <Link href={props.url} passHref>
            <Box as="a" href={props.url} bgColor="white" borderRadius="50%" h="42px" w="42px" padding="10px">
                <ChakraNextImage
                    src={props.imageSrc}
                    alt={props.altText}
                    width={30}
                    height={30}
                    minW="30px"
                    minH="30px"
                />
            </Box>
        </Link>
    )
    return (
        <VStack w="100%">
            {children}
            <HStack w="100%" h="250px" margin="10px 20px" minW={{ base: '210px', sm: '420px' }}>
                <Spacer />
                <Box h="210px" w="210px" padding="10px 20px" bgColor="red">
                    広告枠3
                </Box>
                <Box h="210px" w="210px" padding="10px 20px" bgColor="red" display={{ base: 'none', sm: 'flex' }}>
                    広告枠4
                </Box>
                <Spacer />
            </HStack>
            <Box w="100%" position="sticky" bottom="0">
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginRight="0px"
                    paddingBottom="10px"
                    zIndex="1"
                >
                    <Link href="/qa/post" passHref>
                        <Box as="a" href="/qa/post">
                            <HStack
                                paddingLeft="13px"
                                spacing="0px"
                                bgColor="#FF9037"
                                h="60px"
                                w="210px"
                                borderRadius="30px"
                                boxShadow="md"
                                color="white"
                                _hover={{ bgColor: '#FFDA77' }}
                                _active={{ opacity: '50%', outline: 'none' }}
                                _focus={{ outline: 'none' }}
                            >
                                <Text fontSize="3xl">？</Text>
                                <Text fontWeight="700" fontSize="2xl">
                                    質問してみる
                                </Text>
                            </HStack>
                        </Box>
                    </Link>
                </Box>
                <HStack
                    w="100%"
                    h="50px"
                    paddingX="10%"
                    spacing="auto"
                    bgColor="#FFDA77"
                    alignItems="center"
                    display={{ base: 'flex', sm: 'none' }}
                >
                    <NavButton imageSrc={CATEGORY_IMAGE_PATH} altText="カテゴリ" url="/qa/category" />
                    <NavButton imageSrc={ALL_Q_IMAGE_PATH} altText="Q&A一覧" url="/qa/all" />
                    <NavButton imageSrc={RANKING_IMAGE_PATH} altText="ランキング" url="/qa/ranking" />
                    <Popover>
                        <PopoverTrigger>
                            <IconButton
                                aria-label="検索"
                                bgColor="white"
                                h="42px"
                                w="42px"
                                borderRadius="50%"
                                justifySelf="right"
                                icon={<SearchIcon />}
                            />
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>質問を検索</PopoverHeader>
                            <PopoverBody>
                                <Input></Input>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </HStack>
            </Box>
        </VStack>
    )
}

export default QACardWindow
