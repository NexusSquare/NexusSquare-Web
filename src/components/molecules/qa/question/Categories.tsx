import { Checkbox, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import QACategories from '../../../../constants/qa/qaCategories'
import { QACategory } from '../../../../constants/query'

interface Props {
    selectedCategories: QACategory[]
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
}
export const Categories = ({ selectedCategories, onChange }: Props) => {
    const CATEGORIES = Object.values(QACategories)

    return (
        <Wrap spacing="4" bg={'white'} p="4">
            {CATEGORIES.map((c, index) => {
                return (
                    <WrapItem key={index} minW={24}>
                        <Checkbox
                            colorScheme="orange"
                            onChange={onChange}
                            isChecked={selectedCategories.includes(c)}
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
