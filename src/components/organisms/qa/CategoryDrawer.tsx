import { Checkbox, HStack, Radio, RadioGroup, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'
import QACategories from '../../../constants/qa/qaCategories'
import { QACategory } from '../../../constants/query'
import { SORT, SortItem } from '../../../constants/sort'
import { useErrorToast } from '../../../hooks/toast/useErrorToast'
import { Drawer } from '../../ui/common/Drawer/Drawer'
import { PrimaryButton } from '../../ui/common/Button/PrimaryButton'
import { SecondaryButton } from '../../ui/common/Button/SecondaryButton'
import { Categories } from '../../ui/features/QA/question/Categories'

interface Props {
    onClose: () => void
    isOpen: boolean
    clickFilter: (value: QACategory[]) => void
    clickReset: () => void
    initCategories: QACategory[]
}
export const CategoryDrawer = ({ onClose, isOpen, clickFilter, clickReset, initCategories }: Props) => {
    const [categories, setCategories] = useState<QACategory[]>(initCategories)

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

    const onChangeCategories = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedCategory = e.target.value as QACategory
        if (e.target.checked) {
            setCategories((cats) => [...cats, selectedCategory])
        } else {
            setCategories((cats) => cats.filter((c) => c !== selectedCategory))
        }
    }
    return (
        <Drawer onClose={onClose} isOpen={isOpen} headerText={'カテゴリー'}>
            <Categories selectedCategories={categories} onChange={onChangeCategories} />
            <HStack spacing={4}>
                <SecondaryButton buttonText="リセット" type="button" width={'full'} onClick={onClickReset} />
                <PrimaryButton buttonText="設定する" type="button" width={'full'} onClick={onClickFilter} />
            </HStack>
        </Drawer>
    )
}
