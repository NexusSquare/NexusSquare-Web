import React from 'react'
import { Box, VStack, Text, Divider, Heading, OrderedList, ListItem, Link, UnorderedList } from '@chakra-ui/react'
import { RuleBody } from '../../molecules/rule/RuleBody'

export const RulePage = (): JSX.Element => {
    return (
        <Box bgColor="subColor" p={{ base: '2', md: '36' }}>
            <VStack spacing={10} h="full" bgColor="White" px={{ base: '10', md: '20' }} py="10" borderRadius="40">
                <Text as="h1" fontWeight="bold" fontSize={{ base: '25', md: '33' }}>
                    利用規約
                </Text>
                <Divider />
                <Text fontSize="lg">
                    この利用規約（以下,「本規約」といいます。）は,学生が有志で運営する団体「Nexus
                    Square」（以下,「当団体」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。本サービスは愛知県立大学が運営しているものではありません。
                </Text>
                <RuleBody />
                <Text fontSize="lg">
                    連絡先:
                    <Link color="accentColor" href="mailto:apu.nexussquare@gmail.com">
                        apu.nexussquare@gmail.com
                    </Link>
                </Text>
            </VStack>
        </Box>
    )
}
