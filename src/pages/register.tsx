import { Box, Button, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import mail from "../entity/mail";

const Register: NextPage = () => {
    const { register, handleSubmit, watch, formState: { errors,isSubmitting } } = useForm<mail>()
    return (
        <VStack>
            <Text>ここに愛知県立大学のメールアドレスを入力してください</Text>
            <Box as="form">
                <FormControl>
                    <FormLabel>パスワード</FormLabel>
                    <Input {...register('mail', {
                                required: 'This is required',
                                minLength: { value: 1, message: 'タイトルは最小1文字必要です' },
                                maxLength: { value: 50, message: 'タイトルは50文字までです' },
                                pattern: /[a-z]{2}[0-9]{6}@[a-z]+\.aichi\-pu\.ac\.jp/
                            })} placeholder="県大のメールアドレスを入力" type="email" />
                </FormControl>
                <Button type="submit">送信する</Button>
            </Box>
        </VStack>
    )
}
export default Register