import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { NextPage } from 'next'
import ChakraNextImage from '../components/common/chakraNextImage'

const Gift: NextPage = () => {
    return (
        <VStack>
            <HStack>
                <Button>戻る</Button>
            </HStack>
            <Text>Amazonギフト券500円分</Text>
            <Text>あなたの所持ポイント:pt</Text>
            <Text>ptで一口応募できます</Text>
        </VStack>
    )
}
export default Gift
