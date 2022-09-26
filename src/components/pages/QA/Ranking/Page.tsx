import { Box, Text } from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import QAResponse from '../../../../types/api/res//qa/qaResponse'
import Question from '../../../../types/domain/qa/Question'
import QAQueryProps from '../../../../groupObject/qa/queryGroup'
import queryOptions from '../../../../groupObject/qa/queryOptions'
import QACardList from '../../../qa/QACardList'
import QACardWindow from '../../../qa/QACardWindow'

interface Props {
    questions: Question[]
    query: QAQueryProps
}

export const Page = (props: Props): JSX.Element => {
    return (
        <>
            <Box h="100px" w="100%" display="flex" alignItems="center">
                <Text paddingLeft={{ base: '5%', md: '10%' }} fontSize="4xl" textAlign="left">
                    週間アクセスランキング
                </Text>
            </Box>
            <QACardWindow>
                <QACardList data={props.questions} query={props.query} />
            </QACardWindow>
        </>
    )
}
