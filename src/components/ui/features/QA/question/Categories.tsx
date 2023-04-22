import { Checkbox, Wrap, WrapItem, Text, Box, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import QACategories, {
    QA_STUDENT_LIFE_CATEGORIES,
    QA_SUBJECT_CATEGORIES,
} from '../../../../../constants/qa/qaCategories'
import { QACategory } from '../../../../../constants/query'

interface Props {
    selectedCategories: QACategory[]
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
}
export const Categories = ({ selectedCategories, onChange }: Props) => {
    const QA_SUBJECT_CATEGORIES_LIST = Object.values(QA_SUBJECT_CATEGORIES)
    const QA_STUDENT_LIFE_CATEGORIES_LIST = Object.values(QA_STUDENT_LIFE_CATEGORIES)

    return (
        <VStack alignItems={'start'} spacing="4" bg={'white'} p="4">
            <Text fontWeight={'bold'} color="gray.600">
                学部別
            </Text>
            <CategoriesList
                categories={QA_SUBJECT_CATEGORIES_LIST}
                selectedCategories={selectedCategories}
                onChange={onChange}
            />
            <Text fontWeight={'bold'} color="gray.600">
                学生生活
            </Text>
            <CategoriesList
                categories={QA_STUDENT_LIFE_CATEGORIES_LIST}
                selectedCategories={selectedCategories}
                onChange={onChange}
            />
        </VStack>
    )
}

interface CategoriesListProps {
    categories: string[]
    selectedCategories: QACategory[]
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
}

const CategoriesList = ({ categories, selectedCategories, onChange }: CategoriesListProps) => {
    return (
        <Wrap>
            {categories.map((c, index) => {
                return (
                    <WrapItem key={index} minW={24}>
                        <Checkbox
                            colorScheme="orange"
                            onChange={onChange}
                            isChecked={selectedCategories.includes(c as QACategory)}
                            value={c}
                        >
                            {c}
                        </Checkbox>
                    </WrapItem>
                )
            })}
        </Wrap>
    )
}
