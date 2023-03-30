import { Box } from '@chakra-ui/react'
import Link from 'next/link'

interface Props {
    url: string
    isComp: boolean
    funcName: string
}

export const NavigationLink: React.VFC<Props> = (props) => {
    return props.isComp ? (
        <Link href={props.url} passHref>
            <Box
                as="span"
                whiteSpace="nowrap"
                fontWeight="bold"
                color="#FEEBC8"
                fontSize="sm"
                _hover={{ textDecoration: 'underline' }}
            >
                {props.funcName}
            </Box>
        </Link>
    ) : (
        <Box
            whiteSpace="nowrap"
            onClick={() => alert('今後実装予定！お楽しみに！')}
            _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
            fontWeight="bold"
            color="#FEEBC8"
            fontSize="sm"
        >
            {props.funcName}
        </Box>
    )
}
