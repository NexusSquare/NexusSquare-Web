import { Radio, RadioGroup, VStack } from '@chakra-ui/react'
import React from 'react'
import { SORT, SortItem } from '../../../constants/sort'
import { Drawer } from '../../common/Drawer'
import { PrimaryButton } from '../../common/PrimaryButton'

interface Props {
    onClose: () => void
    isOpen: boolean
    clickSort: (value: SortItem) => void
}
export const SortDrawer = ({ onClose, isOpen, clickSort }: Props) => {
    const [value, setValue] = React.useState(SORT[0].value)
    const onClickSort = () => {
        const sortItem = SORT.find((s) => s.value === value)
        if (!sortItem) return
        clickSort(sortItem)
    }
    return (
        <Drawer onClose={onClose} isOpen={isOpen} headerText={'並び替え'}>
            <RadioGroup onChange={setValue} value={value} colorScheme="orange" mb="4">
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
