import { SearchIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    HStack,
    Icon,
    IconButton,
    Input,
    Select,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEventHandler, ReactNode, useRef, useState } from 'react'
import { LINKS } from '../../../constants/links'
import QACategories from '../../../constants/qa/qaCategories'
import { QACategory } from '../../../constants/query'
import { SORT, SortItem } from '../../../constants/sort'
import { useErrorToast } from '../../../hooks/errors/useErrorToast'
import { SecondaryButton } from '../../common/SecondaryButton'

interface Props {
    children?: ReactNode
    windowH: number
}

export const LeftBar2: Function = ({ children }: Props): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const errorToast = useErrorToast()
    const CATEGORIES = Object.values(QACategories)
    const [categories, setCategories] = useState<QACategory[]>([])
    const onChangeCategories = (e: ChangeEvent<HTMLInputElement>, category: QACategory) => {
        if (e.target.checked) {
            setCategories((cats) => [...cats, category])
        } else {
            setCategories((cats) => cats.filter((c) => c !== category))
        }
    }
    const onClickSearch = (text?: string) => {
        if (!text) return
        if (text.length <= 1) {
            errorToast('2文字以上入力してください')
            return
        }
        router.push({ pathname: LINKS.QUESTION_RESULT, query: { title: text } })
        resetSearchField()
    }
    const resetSearchField = () => {
        if (!inputRef.current) return
        inputRef.current.value = ''
    }

    const onClickRest = () => {
        router.push(LINKS.QUESTION)
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
            <VStack spacing={4} w="full" display={{ base: 'none', xl: 'flex' }}>
                <Box w="full">
                    <HStack justify={'space-between'} w="full" mb={2}>
                        <Text fontSize={'2xl'} fontWeight={'bold'}>
                            検索条件
                        </Text>
                        <SecondaryButton type="button" buttonText="リセット" onClick={onClickRest} />
                    </HStack>
                    <Text color="gray.600" fontWeight={'bold'}>
                        現在の検索結果：
                    </Text>
                    <HStack w="full">
                        <Input
                            placeholder="キーワード検索"
                            w="full"
                            borderRadius={'sm'}
                            bgColor={'white'}
                            ref={inputRef}
                        ></Input>
                        <Button
                            bgColor={'mainColor'}
                            color="white"
                            borderRadius={'sm'}
                            onClick={() => onClickSearch(inputRef.current?.value)}
                        >
                            <SearchIcon />
                        </Button>
                    </HStack>
                </Box>

                <Box w="full">
                    <Text color="gray.600" mb={2} fontWeight={'bold'}>
                        並び替え
                    </Text>
                    <Select bgColor={'white'}>
                        {SORT.map((s, index) => {
                            return (
                                <option value={s.value} key={index}>
                                    {s.value}
                                </option>
                            )
                        })}
                    </Select>
                </Box>

                <Box w="full">
                    <Text color="gray.600 " mb={2} fontWeight={'bold'}>
                        カテゴリー
                    </Text>
                    <Wrap spacing="4" bg={'white'} p="4">
                        {CATEGORIES.map((c, index) => {
                            return (
                                <WrapItem key={index}>
                                    <Checkbox
                                        colorScheme="orange"
                                        onChange={(e) => onChangeCategories(e, c)}
                                        isChecked={categories.includes(c)}
                                    >
                                        {c}
                                    </Checkbox>
                                </WrapItem>
                            )
                        })}
                    </Wrap>
                </Box>
            </VStack>
        </VStack>
    )
}
