import React from 'react'
import { Box, Heading, VStack, Text, Link, Divider, OrderedList, ListItem } from '@chakra-ui/react'

export const Page = (): JSX.Element => {
    return (
        <Box bgColor="subColor" p={{ base: '2', md: '36' }}>
            <VStack spacing={10} h="full" bgColor="White" px={{ base: '10', md: '20' }} py="10" borderRadius="40">
                <Text as="h1" fontWeight="bold" fontSize={{ base: '25', md: '33' }}>
                    プライバシーポリシー
                </Text>
                <Divider />
                <VStack align="left" w="full">
                    <Heading as="h1" fontSize="20">
                        第1条(個人情報取得)
                    </Heading>
                    <VStack spacing={2} align="left" w="full">
                        <Text fontSize="lg">
                            当団体は、本サービスの提供に際し、必要な範囲においてユーザー情報を取得します。ユーザーが本サービスの利用登録の申込み時に提供等する情報は下記の通りです。
                        </Text>
                        <OrderedList pl="5">
                            <ListItem fontSize="lg"> 氏名</ListItem>
                            <ListItem fontSize="lg"> 学校用メールアドレス</ListItem>
                            <ListItem fontSize="lg"> アカウントのプロフィールとして任意にアップロードした写真</ListItem>
                            <ListItem fontSize="lg">
                                アカウントに関する情報として、本サービスに対して、任意に提供等したその他の情報（学年、学部、性別等）
                            </ListItem>
                        </OrderedList>
                    </VStack>
                    <Text fontSize="lg">
                        また、個人情報保護法十七条第二項各号に明記されている場合を除いて、利用者様ご本人の同意を得ずユーザ情報を取得することはありません。
                    </Text>
                </VStack>

                <VStack align="left" w="full">
                    <Heading as="h1" fontSize="20">
                        第2条(ユーザ情報の利用目的)
                    </Heading>
                    <Text fontSize="lg">本サービスのユーザ情報の利用目的といたしましては、以下のとおりです。</Text>
                    <Text fontSize="lg">(1)本サービスにおける本人確認のため。</Text>
                    <Text fontSize="lg">
                        (2)本サービスが行うキャンペーンなどで当選した商品を利用者様にお届けするため。
                    </Text>
                    <Text fontSize="lg">(3)本サービスの運営に関わるお知らせを送信するため。</Text>
                </VStack>

                <VStack align="left" w="full">
                    <Heading as="h1" fontSize="20">
                        第3条(個人情報の開示)
                    </Heading>
                    <Text fontSize="lg">
                        当団体は本人から個人情報の開示を求められたときには、遅滞なく本人に対しこれを開示します。個人情報の利用目的の通知や訂正、追加、削除、利用の停止、第三者への提供の停止を希望される方は以下のメールアドレスにお問い合わせください。
                    </Text>
                    <Text fontSize="lg" color="accentColor">
                        <Link href="mailto:apu.nexussquare@gmail.com">apu.nexussquare@gmail.com</Link>
                    </Text>
                </VStack>

                <VStack align="left" w="full">
                    <Heading as="h1" fontSize="20">
                        第4条(第三者提供の制限)
                    </Heading>
                    <Text fontSize="lg">
                        (1)当団体は、次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。
                    </Text>
                    <VStack spacing={2} align="left" w="full">
                        <OrderedList pl="1">
                            <ListItem fontSize="lg">法令に基づく場合</ListItem>
                            <ListItem fontSize="lg">
                                {' '}
                                人の生命、身体又は財産の保護のために必要がある場合であって、ユーザー本人の同意を得ることが困難であるとき
                            </ListItem>
                            <ListItem fontSize="lg">
                                {' '}
                                公衆衛生の向上又は児童の健全な育成の推進のために、特に必要がある場合であって、ご本人の同意を得ることが困難であるとき
                            </ListItem>
                            <ListItem fontSize="lg">
                                国の機関もしくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、ご本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
                            </ListItem>
                            <ListItem fontSize="lg">
                                {' '}
                                当団体や第三者の広告の配信又は表示のため、第三者に提供するとき
                            </ListItem>
                        </OrderedList>
                    </VStack>
                    <br />
                    <Text fontSize="lg">
                        (2)ユーザーが本サービスからログアウトした場合やアカウントを削除した場合には、当団体で必要な手続きを完了して以降は、ユーザー情報を第三者に提供は致しません。
                    </Text>
                </VStack>

                <VStack align="left" w="full">
                    <Heading as="h1" fontSize="20">
                        第5条(プライバシーポリシーの変更)
                    </Heading>
                    <Text fontSize="lg">
                        当団体では、本ポリシーの変更を行う際、ユーザーに通知することなく変更することができるものとします。変更後の本ポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
                    </Text>
                </VStack>

                <VStack align="left" w="full">
                    <Heading as="h1" fontSize="20">
                        お問い合わせ
                    </Heading>
                    <Text fontSize="lg">
                        本ポリシーに関するお問い合わせは，以下のメールアドレスにお願いいたします。
                    </Text>

                    <Text fontSize="lg">
                        メールアドレス:
                        <Link color="accentColor" href="mailto:apu.nexussquare@gmail.com">
                            apu.nexussquare@gmail.com
                        </Link>
                    </Text>
                </VStack>
            </VStack>
        </Box>
    )
}
