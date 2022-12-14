import { SearchIcon } from '@chakra-ui/icons'
import { Box, HStack, VStack, Text, Select, Wrap, WrapItem, Checkbox, Input, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ChangeEvent, ReactNode, useRef, useState } from 'react'
import { PAGE_LINKS } from '../../../../constants/pageLinks'
import QACategories from '../../../../constants/qa/qaCategories'
import { QACategory } from '../../../../constants/query'
import { SORT, SortItem } from '../../../../constants/sort'
import { useErrorToast } from '../../../../hooks/errors/useErrorToast'
import { useDidUpdateEffect } from '../../../../hooks/useDidUpdateEffect'
import { SecondaryButton } from '../../../common/SecondaryButton'

import { BaseLeftBar } from '../../LeftBar/_Base'

interface Props {
    children?: ReactNode
    sortQuestions: (value: SortItem) => void
    filterQuestions: (value: QACategory[]) => void
    questionNum: number
}

export const SearchLeftBar = ({ sortQuestions, filterQuestions, questionNum }: Props): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const errorToast = useErrorToast()
    const CATEGORIES = Object.values(QACategories)
    const [categories, setCategories] = useState<QACategory[]>([])
    const initSortValue = SORT[0]
    const [sortItem, setSortItem] = useState<SortItem>(initSortValue)

    const onChangeCategories = (e: ChangeEvent<HTMLInputElement>, category: QACategory) => {
        if (e.target.checked && categories.length < 10) {
            setCategories((cats) => [...cats, category])
        } else {
            setCategories((cats) => cats.filter((c) => c !== category))
        }
    }

    const onChangeSortItem = (e: ChangeEvent<HTMLSelectElement>) => {
        const sortItem = SORT.find((s) => s.value === e.target.value)
        if (!sortItem) return
        setSortItem(sortItem)
    }

    const onClickSearch = (text?: string) => {
        if (!text) return
        if (text.length <= 1) {
            errorToast('2文字以上入力してください')
            return
        }
        router.push({ pathname: PAGE_LINKS.QA.RESULT.URL, query: { title: text } })
        resetSearchField()
    }
    const resetSearchField = () => {
        if (!inputRef.current) return
        inputRef.current.value = ''
    }

    const onClickRest = () => {
        router.push(PAGE_LINKS.QA.URL)
    }

    // NOTE:カテゴリーを更新する
    useDidUpdateEffect(() => {
        filterQuestions(categories)
    }, [categories])

    useDidUpdateEffect(() => {
        sortQuestions(sortItem)
    }, [sortItem])
    return (
        <BaseLeftBar>
            <VStack spacing={4} w="full" display={{ base: 'none', xl: 'flex' }}>
                <Box w="full">
                    <HStack justify={'space-between'} w="full" mb={2}>
                        <Text fontSize={'2xl'} fontWeight={'bold'}>
                            検索条件
                        </Text>
                        <SecondaryButton type="button" buttonText="リセット" onClick={onClickRest} />
                    </HStack>
                    <Text color="gray.600" fontWeight={'bold'} mb={2}>
                        現在の検索結果：{questionNum}件
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
                    <Select bgColor={'white'} onChange={onChangeSortItem}>
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
                    <Text color="gray.600" mb={2} fontWeight={'bold'}>
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
        </BaseLeftBar>
    )
}
