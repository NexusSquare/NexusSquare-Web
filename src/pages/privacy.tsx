import { Box } from '@chakra-ui/react'
import { NextPage } from 'next'
import React from 'react'
import DefaultLayout from '../components/common/DefaultLayout'

const Privacy: NextPage = () => {
    return (
        <DefaultLayout pageName="プライバシーポリシー">
            <Box w="full">プライバシーポリシーのページです</Box>
        </DefaultLayout>
    )
}

export default Privacy
