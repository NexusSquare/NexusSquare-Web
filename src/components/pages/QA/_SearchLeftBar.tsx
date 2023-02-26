import { SearchIcon } from '@chakra-ui/icons'
import { Box, HStack, VStack, Text, Select, Wrap, WrapItem, Checkbox, Input, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ChangeEvent, ReactNode, useRef, useState } from 'react'
import { PAGE_LINKS } from '../../../constants/pageLinks'
import { Direction, OrderBy, QACategory } from '../../../constants/query'
import { SORT, SortItem } from '../../../constants/sort'
import { useErrorToast } from '../../../hooks/errors/useErrorToast'
import { useDidUpdateEffect } from '../../../hooks/useDidUpdateEffect'
import { SecondaryButton } from '../../common/SecondaryButton'
import { Categories } from '../../molecules/qa/question/Categories'

import { BaseLeftBar } from '../../layouts/LeftBar/_Base'

interface Props {
    children?: ReactNode
    sortQuestions: (value: SortItem) => void
    filterQuestions: (value: QACategory[]) => void
    questionNum: number
    initCategories: QACategory[]
    initDirection: Direction
    initOrderBy: OrderBy
}

export const SearchLeftBar = ({
    sortQuestions,
    filterQuestions,
    questionNum,
    initCategories,
    initDirection,
    initOrderBy,
}: Props): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const errorToast = useErrorToast()
    const [categories, setCategories] = useState<QACategory[]>(initCategories)
    const initSortValue =
        SORT.find((sortItem) => initOrderBy === sortItem.orderBy && initDirection === sortItem.direction) ?? SORT[0]

    const [sortItem, setSortItem] = useState<SortItem>(initSortValue)

    const onChangeCategories = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedCategory = e.target.value as QACategory
        if (!e.target.checked) {
            setCategories((cats) => cats.filter((c) => c !== selectedCategory))
            return
        }
        if (e.target.checked && categories.length < 10) {
            setCategories((cats) => [...cats, selectedCategory])
            return
        }
        errorToast('選択できるカテゴリーは10個までです。')
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
        setSortItem(SORT[0])
        setCategories([])
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
            <VStack spacing={4} w="full">
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
                    <Select bgColor={'white'} onChange={onChangeSortItem} defaultValue={sortItem.value}>
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
                    <Box maxH={96} overflow={'scroll'} border={'1px'} borderColor={'gray.200'} rounded={'sm'}>
                        <Categories selectedCategories={categories} onChange={onChangeCategories} />
                    </Box>
                </Box>
            </VStack>
        </BaseLeftBar>
    )
}
