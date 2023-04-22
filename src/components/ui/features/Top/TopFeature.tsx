import { Box, Heading, HStack, VStack, Text, Stack } from '@chakra-ui/react'
import React from 'react'
import { RiQuestionAnswerLine } from 'react-icons/ri'
import ChakraNextImage from '../../common/chakraNextImage'
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
            <FeatureContent
                heading="学生生活Q&A"
                text="学生生活Q&Aは、愛知県立の学生間で質問・回答し合えるサービスです。学部別、内容別にカテゴリーされており、質問のタイトル検索機能もあるため、質問・回答以外の利用もしていただけます。プロフィールからは、ユーザー名の変更や過去の活動履歴を確認できます。"
                isReversed={true}
                imageSrc="/images/iphone/qa.png"
            >
                <RiQuestionAnswerLine color="#FF9037" style={{ display: 'inline' }} />
            </FeatureContent>
            <FeatureContent
                heading="ポイント制（導入予定）"
                text="質問で10ポイント、回答で20ポイントなどNexus Square内で投稿をして県大生をお助けすると、 ポイントが付与されます。いっぱい貯めるといいことがある予感...！"
                isReversed={false}
                imageSrc="/images/iphone/point.png"
            >
                <FaCoins color="#FF9037" style={{ display: 'inline' }} />
            </FeatureContent>
        </VStack>
    )
}
