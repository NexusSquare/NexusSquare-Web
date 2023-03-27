import { Box, HStack, Spacer, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import ChakraNextImage from '../../common/chakraNextImage'
import { PAGE_LINKS } from '../../../constants/pageLinks'
import { SPONSERS } from '../../../constants/sponser'
import { SponserBanner } from '../../common/suponser/Banner'

interface Props {
    children?: ReactNode
}
interface NavButtonProps {
    imageSrc: string
    altText: string
    url: string
}

const QACardWindow: Function = ({ children }: Props): JSX.Element => {
    const CATEGORY_IMAGE_PATH: string = '/images/category.png'
    const ALL_Q_IMAGE_PATH: string = '/images/all.png'
    const RANKING_IMAGE_PATH: string = '/images/crown.png'
    const router = useRouter()
    const onClickPostButton = () => {
        router.push(PAGE_LINKS.QA.POST.URL)
    }
    const NavButton: React.VFC<NavButtonProps> = (props) => (
        <Link href={props.url} passHref>
            <Box as="a" href={props.url} bgColor="white" borderRadius="50%" h="42px" w="42px" padding="10px">
                <ChakraNextImage
                    src={props.imageSrc}
                    alt={props.altText}
                    width={30}
                    height={30}
                    minW="30px"
                    minH="30px"
                />
            </Box>
        </Link>
    )
    return (
        <VStack w="100%" spacing={0}>
            {children}
            <HStack justifyContent={'center'} py="12">
                <SponserBanner sponser={SPONSERS.mapquest} width={240} height={240} />
            </HStack>

            <HStack
                bottom="4"
                right={4}
                position={'fixed'}
                display={{ base: 'flex', md: 'none' }}
                bgColor="#FF9037"
                borderRadius="full"
                boxShadow="md"
                color={'white'}
                _hover={{ bgColor: '#FFDA77' }}
                _active={{ opacity: '50%', outline: 'none' }}
                _focus={{ outline: 'none' }}
                padding={2}
                onClick={onClickPostButton}
            >
                <AiOutlinePlus size={32} />
            </HStack>
        </VStack>
    )
}

export default QACardWindow
