import { VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FormEventHandler, ReactNode } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import ChakraNextImage from '../common/chakraNextImage'
import { SecondaryButton } from '../common/SecondaryButton'

interface Props {
    children?: ReactNode
    windowH: number
}
interface NavButtonProps {
    imageSrc: string
    altText: string
    name: string
    url: string
}

export const LeftBar: Function = ({ children }: Props): JSX.Element => {
    const CATEGORY_IMAGE_PATH: string = '/images/category.png'
    const ALL_Q_IMAGE_PATH: string = '/images/all.png'
    const RANKING_IMAGE_PATH: string = '/images/crown.png'
    const router = useRouter()
    const [title, setTitle] = useState<string>('')
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setTitle(value)
    }
    const onClickHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (title === '') {
            return
        }
        console.log('router.push!')
        router.push({
            pathname: '/qa/result',
            query: { title: title },
        })
    }
    return (
        <VStack
            as="nav"
            aria-labelledby="QA navigation"
            bgColor="subColor"
            paddingTop={6}
            h="calc(100vh - 60px)"
            w={{ base: 'calc((100vw - 800px) / 2)', sm: '100px', lg: 'calc((100vw - 800px) / 2)' }}
            minW="60px"
            display={{ base: 'none', sm: 'flex' }}
            position="fixed"
            top={{ base: '98px', md: '60px' }}
            left="0"
            paddingX={8}
            alignItems={'start'}
        ></VStack>
    )
}
