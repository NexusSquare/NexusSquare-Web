import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import Question from '../../../../types/domain/qa/Question'

import QACardWindow from '../../../qa/QACardWindow'
import QACardList from '../../../qa/QACardList'

interface Props {
    questions: Question[]
    title: string | string[]
}
export const Page = ({ questions, title }: Props) => {
    return (
        <>
            <Box h="100px" w="100%" display="flex" alignItems="center">
                <Text paddingLeft={{ base: '5%', md: '10%' }} fontSize="4xl" textAlign="left">
                    {title}の検索結果
                </Text>
            </Box>
            <QACardWindow>
                <QACardList data={questions} />
            </QACardWindow>
        </>
    )
}
