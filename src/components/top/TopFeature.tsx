import { Box, Heading, HStack, VStack, Text, Stack } from '@chakra-ui/react'
import React from 'react'
import { RiQuestionAnswerLine } from 'react-icons/ri'
import ChakraNextImage from '../common/chakraNextImage'
import { FaCoins } from 'react-icons/fa'
import { FeatureContent } from './FeatureContent'

export const TopFeature = () => {
    return (
        <VStack
            bgColor="subColor"
            paddingY={'5%'}
            paddingX={{ base: '5%', md: '10%' }}
            spacing="30px"
            background={'linear-gradient(0deg, transparent calc(10vw - 1px), white  10vw, #FBF6F0 100%)'}
        >
            <Heading marginBottom="50px">機能紹介</Heading>
            <FeatureContent
                heading="学生生活Q&A"
                text="Nexus Squareは、愛知県立大学の学生が立ち上げた団体です。
            友人関係やサークルに参加しているかどうかで、人によって得られる情報が限られ、「情報格差」が生まれています。
            そこで、授業・留学・就活など、大学生活で生まれる悩みを解決するため、
            自由に質問・回答ができるサービスです。"
                isReversed={true}
            >
                <RiQuestionAnswerLine color="#FF9037" style={{ display: 'inline' }} />
            </FeatureContent>
            <FeatureContent
                heading="ポイント制"
                text="質問で10ポイント、回答で20ポイントなどNexus Square内で投稿をして県大生をお助けすると、 ポイントが付与されます。500ポイントでamazonギフト券獲得の抽選に応募できます。"
                isReversed={false}
            >
                <FaCoins color="#FF9037" style={{ display: 'inline' }} />
            </FeatureContent>
        </VStack>
    )
}
