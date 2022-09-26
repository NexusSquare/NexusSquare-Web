import { Box, Text } from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import { GetServerSideProps, NextPage, NextPageWithLayout } from 'next'
import { useRouter } from 'next/router'
import { Layout } from '../../components/layouts/QA/Layout'
import { Page } from '../../components/pages/QA/Post/Page'

import queryOptions from '../../constants/qa/queryOptions'
import QAResponse from '../../types/api/res/qa/qaResponse'
import Question from '../../types/domain/qa/Question'

const Post: NextPageWithLayout = () => <Page />

Post.getLayout = (page) => <Layout pageName="質問の投稿">{page}</Layout>
