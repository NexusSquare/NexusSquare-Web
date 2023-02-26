import { Radio, RadioGroup, VStack } from '@chakra-ui/react'
import React from 'react'
import { Direction, OrderBy } from '../../../constants/query'
import { SORT, SortItem } from '../../../constants/sort'
import { Drawer } from '../../common/Drawer'
import { PrimaryButton } from '../../common/PrimaryButton'

interface Props {
    onClose: () => void
    isOpen: boolean
    clickSort: (value: SortItem) => void
    initDirection: Direction
    initOrderBy: OrderBy
}
export const SortDrawer = ({ onClose, isOpen, clickSort, initDirection, initOrderBy }: Props) => {
    const [value, setValue] = React.useState(SORT[0].value)
    const initSortValue =
        SORT.find((sortItem) => initOrderBy === sortItem.orderBy && initDirection === sortItem.direction) ?? SORT[0]
    const onClickSort = () => {
        const sortItem = SORT.find((s) => s.value === value)
        if (!sortItem) return
        clickSort(sortItem)
    }
    return (
        <Drawer onClose={onClose} isOpen={isOpen} headerText={'並び替え'}>
            <RadioGroup
                onChange={setValue}
                value={value}
                colorScheme="orange"
                mb="4"
                defaultValue={initSortValue.value}
            >
                <VStack w="full" alignItems={'start'}>
                    {SORT.map((s, index) => {
                        return (
                            <Radio value={s.value} key={index}>
                                {s.value}
                            </Radio>
                        )
                    })}
                </VStack>
            </RadioGroup>
            <PrimaryButton buttonText="設定する" type="button" width={'full'} onClick={onClickSort} />
        </Drawer>
    )
}
