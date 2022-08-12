import { Box, Button, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import Footer from '../components/common/Footer'
import Layout from '../components/common/Layout'
import LeftBar from '../components/common/LeftBar'
import RightBar from '../components/common/RigthBar'
import { ProfileContent } from '../components/profile/ProfileContent'
import history from '../types/domain/account/history'

const Profile: NextPage = () => {
    const [histories, setHistories] = useState<history[]>([])
    const pointHistory = () => {
        return (
            <VStack>
                {histories.map((history) => {
                    return (
                        <HStack key={history.userId}>
                            <Box></Box>
                            <VStack>
                                <Text>{history.createAt}</Text>
                                <HStack>
                                    <Text>{history.history}</Text>
                                    <Text>+{history.point}pt</Text>
                                </HStack>
                            </VStack>
                        </HStack>
                    )
                })}
            </VStack>
        )
    }
    return (
        <Layout pageName={'プロフィール'}>
            <HStack spacing="0px">
                <LeftBar />
                <VStack
                    w={{
                        base: '100%',
                        sm: '100vw',
                        md: 'calc(100vw - 210px)',
                        lg: 'calc(100vw - 210px)',
                        xl: 'calc(400px + 50vw)',
                    }}
                    paddingLeft={{ base: '0', sm: '100px', lg: 'calc((100vw - 800px) / 2)' }}
                >
                    <ProfileContent />
                    <Footer />
                </VStack>

                <RightBar />
            </HStack>
        </Layout>
    )
}
export default Profile
