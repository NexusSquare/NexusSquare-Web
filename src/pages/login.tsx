import type { NextPage } from 'next'
import { Box, Button, HStack, IconButton, Image, Spacer, Text, VStack, FormControl, FormErrorMessage, FormLabel, Input, } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import QARequest from "../entity/qa/qaRequest";
import userPost from "../entity/userPost"

const LoginPage: NextPage = () => {
    const [userId,setUserId] = useState<string>("")
    const router = useRouter()
    const { register, handleSubmit, watch, formState: { errors,isSubmitting } } = useForm<userPost>()
    const back2Before = () => {
        router.back()
    }
    return (
        <VStack>
            <Button onClick={back2Before}>戻る</Button>
            <VStack>
                <Text>ログイン</Text>
                <Box as="form">
                    <FormControl>
                        <FormLabel>ID</FormLabel>
                        <Input {...register('id', {
                                    required: 'This is required',
                                    minLength: { value: 1, message: 'idは最小1文字必要です' },
                                    maxLength: { value: 50, message: 'idは50文字までです' },
                                })} placeholder="idを入力" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>パスワード</FormLabel>
                        <Input {...register('password', {
                                    required: 'This is required',
                                    minLength: { value: 1, message: 'idは最小1文字必要です' },
                                    maxLength: { value: 300, message: 'idは50文字までです' },
                                })} placeholder="パスワードを入力" />
                    </FormControl>
                    <Button type="submit">ログイン</Button>
                </Box>
            </VStack>
        </VStack>
    )
}
export default LoginPage