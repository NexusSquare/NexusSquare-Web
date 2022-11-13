import { SearchIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    ButtonGroup,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Popover,
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
import React, { FormEventHandler, ReactNode } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import ChakraNextImage from '../../common/chakraNextImage'

interface Props {
    children?: ReactNode
    windowH: number
}
interface NavButtonProps {
    imageSrc: string
    altText: string
    name: string
    url: string
}

export const LeftBar: Function = ({ children }: Props): JSX.Element => {
    const CATEGORY_IMAGE_PATH: string = '/images/category.png'
    const ALL_Q_IMAGE_PATH: string = '/images/all.png'
    const RANKING_IMAGE_PATH: string = '/images/crown.png'
    const router = useRouter()
    const [title, setTitle] = useState<string>('')
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setTitle(value)
    }
    const onClickHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (title === '') {
            return
        }
        console.log('router.push!')
        router.push({
            pathname: '/qa/result',
            query: { title: title },
        })
    }
    const NavButton: React.VFC<NavButtonProps> = (props) => (
        <Link href={props.url} passHref>
            <HStack
                as="a"
                href={props.url}
                bgColor="#FFDA77"
                h="56px"
                w={{ base: '56px', xl: '210px' }}
                borderRadius="30px"
                boxShadow="md"
                paddingLeft="5px"
                paddingRight="5px"
                justifyContent="left"
                _hover={{ opacity: '50%' }}
                _active={{ opacity: '50%', outline: 'none' }}
                _focus={{ outline: 'none' }}
            >
                <Box bgColor="white" borderRadius="50%" h="50px" w="50px" padding="10px">
                    <ChakraNextImage
                        src={props.imageSrc}
                        alt={props.altText}
                        width={30}
                        height={30}
                        minW="30px"
                        minH="30px"
                    />
                </Box>
                <Text
                    justifySelf="center"
                    w="calc(100% - 56px)"
                    fontSize="2xl"
                    fontWeight="normal"
                    display={{ base: 'none', xl: 'flex' }}
                >
                    {props.name}
                </Text>
            </HStack>
        </Link>
    )
    return (
        <VStack
            as="nav"
            aria-labelledby="QA navigation"
            bgColor="#FBF6F0"
            paddingTop="20px"
            h="calc(100vh - 56px)"
            w={{ base: 'calc((100vw - 800px) / 2)', sm: '100px', lg: 'calc((100vw - 800px) / 2)' }}
            minW="56px"
            display={{ base: 'none', sm: 'flex' }}
            position="fixed"
            top={{ base: '98px', md: '56px' }}
            left="0"
        >
            <VStack spacing="56px" margin="30px 10px">
                <NavButton imageSrc={CATEGORY_IMAGE_PATH} altText="カテゴリ一覧" name="カテゴリ" url="/qa/category" />
                <NavButton imageSrc={ALL_Q_IMAGE_PATH} altText="Q&A一覧" name="Q&A一覧" url="/qa/all" />
                <NavButton imageSrc={RANKING_IMAGE_PATH} altText="ランキング" name="ランキング" url="/qa/ranking" />
                <Popover>
                    <PopoverTrigger>
                        <Button
                            variant="solid"
                            bgColor="#FFDA77"
                            h="56px"
                            w="56px"
                            borderRadius="30px"
                            boxShadow="md"
                            paddingLeft="5px"
                            paddingRight="5px"
                            justifyContent="left"
                            _hover={{ opacity: '50%' }}
                            _active={{ opacity: '50%', outline: 'none' }}
                            _focus={{ outline: 'none' }}
                            display={{ base: 'flex', xl: 'none' }}
                        >
                            <Box bgColor="white" borderRadius="50%" h="50px" w="50px" padding="15px 10px 5px">
                                <SearchIcon viewBox="0 0 24 24" boxSize="20px" />
                            </Box>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>質問を検索</PopoverHeader>
                        <PopoverBody>
                            <Box as="form" onSubmit={onClickHandler}>
                                <Input type="text" value={title} onChange={onChangeHandler} />
                                <Button type="submit">検索</Button>
                            </Box>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </VStack>
            <Spacer />
            <Box as="form" onSubmit={onClickHandler} paddingBottom="35%">
                <InputGroup w="260px" display={{ base: 'none', xl: 'unset' }}>
                    <InputLeftElement style={{ top: 'initial' }}>{<SearchIcon />}</InputLeftElement>
                    <Input
                        type="text"
                        value={title}
                        onChange={onChangeHandler}
                        placeholder="Q&Aを検索"
                        bgColor="white"
                        _focus={{ borderColor: '#3DB2FF' }}
                        boxShadow="md"
                    />
                </InputGroup>
            </Box>
        </VStack>
    )
}
