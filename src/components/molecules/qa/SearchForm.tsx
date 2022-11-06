import { SearchIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, IconButton, Input, VStack, Text } from '@chakra-ui/react'
import React, { MutableRefObject, useRef } from 'react'
import { Question } from '../../../types/domain/qa'
import { SecondaryButton } from '../../common/SecondaryButton'

interface Props {
    questions: Question[]
    clickSearch: (value: string) => void
}
export const SearchForm = ({ questions, clickSearch }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const onClickSearch = () => {
        if (!inputRef.current) return
        clickSearch(inputRef.current.value)
        inputRef.current.value = ''
    }
    return (
        <VStack w="full" paddingX={4}>
            <HStack w="full">
                <Input placeholder="タイトル検索" w="full" borderRadius={'sm'} ref={inputRef}></Input>
                <Button bgColor={'mainColor'} color="white" borderRadius={'sm'} onClick={onClickSearch}>
                    <SearchIcon />
                </Button>
            </HStack>
            <HStack w="full">
                <SecondaryButton width="full" buttonText="カテゴリー" type="button" size="sm" borderRadius="sm" />
                <SecondaryButton width="full" buttonText="並び替え" type="button" size="sm" borderRadius="sm" />
            </HStack>
            <Text color="textPrimary" alignSelf={'start'}>
                検索結果：{questions.length}件
            </Text>
        </VStack>
    )
}
