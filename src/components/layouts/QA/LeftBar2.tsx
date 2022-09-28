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
    Select,
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
import { SecondaryButton } from '../../common/SecondaryButton'

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

export const LeftBar2: Function = ({ children }: Props): JSX.Element => {
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
    return (
        <VStack
            as="nav"
            aria-labelledby="QA navigation"
            bgColor="#FBF6F0"
            paddingTop={6}
            h="calc(100vh - 60px)"
            w={{ base: 'calc((100vw - 800px) / 2)', sm: '100px', lg: 'calc((100vw - 800px) / 2)' }}
            minW="60px"
            display={{ base: 'none', sm: 'flex' }}
            position="fixed"
            top={{ base: '98px', md: '60px' }}
            left="0"
            paddingX={8}
            alignItems={'start'}
        >
            <HStack justify={'space-between'} w="full">
                <Text fontSize={'2xl'} fontWeight={'bold'}>
                    検索条件
                </Text>
                <SecondaryButton type="button" buttonText="リセット" />
            </HStack>
            <Text color="gray.600">現在の検索結果：</Text>
            <HStack w="full">
                <Input placeholder="キーワード検索" w="full" borderRadius={'sm'} bgColor={'white'}></Input>
                <Button bgColor={'mainColor'} color="white" borderRadius={'sm'}>
                    <SearchIcon />
                </Button>
            </HStack>
            <Text color="gray.600">並び替え</Text>
            <Select placeholder="新着順（デフォルト）" bgColor={'white'}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </Select>
            <Text color="gray.600">カテゴリー</Text>
            <Select placeholder="なし" bgColor={'white'}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </Select>
        </VStack>
    )
}
