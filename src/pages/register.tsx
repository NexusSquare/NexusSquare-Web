import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Layout from "../components/common/layout";
import mail from "../types/domain/account/mail";

const Register: NextPage = () => {
    const router = useRouter()
    const { register, handleSubmit, watch, formState: { errors,isSubmitting } } = useForm<mail>()
    const back2Before = () => {
        router.back()
    }
    return (
        <Layout pageName="ユーザー登録">
             <VStack paddingTop="70px" w="100%" spacing="20px" >
                <Button margin="10px 2% 0px" alignSelf="start" bgColor="#FF9037" color="white">戻る</Button>
                <Text fontSize="4xl" fontWeight="semibold" bgColor="#FFAF82" color="white" w="100%" textAlign="center">ユーザー登録</Text>
                <Text paddingTop="20px">愛知県立大学で配布されたメールアドレスに登録フォームを送信します</Text>
                <Box as="form" onSubmit={handleSubmit((data) => console.log(`${data}送信完了`))} w={{ base:"100%",sm:"80vw",md:"calc(100vw - 270px)",lg:"50vw" }} paddingTop="20px" alignItems="center">
                    <FormControl isInvalid={errors.mail !== undefined}>
                        <Input id="mail" {...register("mail", {
                                    required: "必須項目です",
                                    minLength: { value: 1, message: "タイトルは最小1文字必要です" },
                                    maxLength: { value: 50, message: "タイトルは50文字までです" },
                                    pattern: { value: /^[a-z]{2}[0-9]{6}@[a-z]+\.aichi\-pu\.ac\.jp$/ ,message:"県大のメールアドレスを入力してください"}
                                })} placeholder="県大のメールアドレスを入力" type="email" />
                        <FormErrorMessage>
                            {errors.mail && errors.mail.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Button type="submit" justifySelf="center">送信する</Button>
                </Box>
            </VStack>
        </Layout>
    )
}
export default Register