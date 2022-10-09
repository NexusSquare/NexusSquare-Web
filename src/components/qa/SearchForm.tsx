import { SearchIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, IconButton, Input, VStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Question } from '../../types/domain/qa'
import { SecondaryButton } from '../common/SecondaryButton'

interface Props {
    questions: Question[]
}
export const SearchForm = ({ questions }: Props) => {
    return (
        <VStack w="full" paddingX={4}>
            <HStack w="full">
                <Input placeholder="キーワード検索" w="full" borderRadius={'sm'}></Input>
                <Button bgColor={'mainColor'} color="white" borderRadius={'sm'}>
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
