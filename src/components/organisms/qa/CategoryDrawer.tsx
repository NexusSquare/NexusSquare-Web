import { Checkbox, Radio, RadioGroup, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'
import QACategories from '../../../constants/qa/qaCategories'
import { QACategory } from '../../../constants/query'
import { SORT, SortItem } from '../../../constants/sort'
import { useErrorToast } from '../../../hooks/errors/useErrorToast'
import { Drawer } from '../../common/Drawer'
import { PrimaryButton } from '../../common/PrimaryButton'
import { SecondaryButton } from '../../common/SecondaryButton'

interface Props {
    onClose: () => void
    isOpen: boolean
    clickFilter: (value: QACategory[]) => void
    clickReset: () => void
}
export const CategoryDrawer = ({ onClose, isOpen, clickFilter, clickReset }: Props) => {
    const CATEGORIES = Object.values(QACategories)
    const [categories, setCategories] = useState<QACategory[]>([])

    const errorToast = useErrorToast()

    const onClickFilter = () => {
        if (categories.length > 10) {
            errorToast('選択できるカテゴリーの数は10個までです。')
            return
        }
        clickFilter(categories)
    }

    const onClickReset = () => {
        setCategories([])
        clickReset()
    }

    const onChangeCategories = (e: ChangeEvent<HTMLInputElement>, category: QACategory) => {
        if (e.target.checked) {
            setCategories((cats) => [...cats, category])
        } else {
            setCategories((cats) => cats.filter((c) => c !== category))
        }
    }
    return (
        <Drawer onClose={onClose} isOpen={isOpen} headerText={'並び替え'}>
            <Wrap spacing="4" mb="4">
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
            <VStack spacing={4}>
                <PrimaryButton buttonText="設定する" type="button" width={'full'} onClick={onClickFilter} />
                <SecondaryButton buttonText="リセット" type="button" width={'full'} onClick={onClickReset} />
            </VStack>
        </Drawer>
    )
}
