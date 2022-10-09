import { Box, HStack, Spacer, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import ChakraNextImage from '../common/chakraNextImage'
import { LINKS } from '../../constants/links'

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
        router.push(LINKS.QUESTION_POST)
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
        <VStack w="100%">
            {children}
            <HStack w="100%" h="250px" margin="10px 20px" minW={{ base: '210px', sm: '420px' }}>
                <Spacer />
                <Box h="210px" w="210px" padding="10px 20px" bgColor="gray.200">
                    広告枠3
                </Box>
                <Box h="210px" w="210px" padding="10px 20px" bgColor="gray.200" display={{ base: 'none', sm: 'flex' }}>
                    広告枠4
                </Box>
                <Spacer />
            </HStack>
            <Box w="100%" position="sticky" bottom="0">
                <Box
                    justifyContent="end"
                    alignItems="center"
                    paddingBottom={4}
                    paddingRight={4}
                    zIndex="1"
                    display={{ base: 'flex', md: 'none' }}
                >
                    <HStack
                        spacing="0px"
                        bgColor="#FF9037"
                        borderRadius="full"
                        boxShadow="md"
                        _hover={{ bgColor: '#FFDA77' }}
                        _active={{ opacity: '50%', outline: 'none' }}
                        _focus={{ outline: 'none' }}
                        padding={2}
                        onClick={onClickPostButton}
                    >
                        <AiOutlinePlus size={32} />
                    </HStack>
                </Box>
            </Box>
        </VStack>
    )
}

export default QACardWindow
