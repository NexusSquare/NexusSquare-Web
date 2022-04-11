import { Box, Button, FormControl, FormErrorMessage, HStack, Input, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Layout from "../../components/common/layout"
import Department from "../../groupObject/department"
import PostUser from "../../groupObject/postUser"
import Foreign from "../../groupObject/subject/foreign"
import Globalre from "../../groupObject/subject/globalre"
import Humanre from "../../groupObject/subject/humanre"
import Subject from "../../groupObject/subject/subject"

type departmentType = typeof Department
type department = typeof Department[keyof departmentType]

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors,isSubmitting } } = useForm<PostUser>()
    const [selectSubjects,setSelectSubjects] = useState<Subject[]>([])
    return (
        <Layout pageName="ユーザー登録">
            <VStack>
                <Box as="form" onSubmit={handleSubmit((data) => console.log(`${data}送信完了`))} w={{ base:"100%",sm:"80vw",md:"calc(100vw - 270px)",lg:"50vw" }} paddingTop="20px" alignItems="center">
                    <HStack>
                        <FormControl isInvalid={errors.lastname !== undefined}>
                            <Input id="lastname" {...register("lastname", {
                                        required: "必須項目です",
                                        minLength: { value: 1, message: "苗字は最小1文字必要です" },
                                        maxLength: { value: 20, message: "苗字は20文字までです" },
                                    })} placeholder="苗字" />
                            <FormErrorMessage>
                                {errors.lastname && errors.lastname.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.firstname !== undefined}>
                            <Input id="firstname" {...register("firstname", {
                                        required: "必須項目です",
                                        minLength: { value: 1, message: "名前は最小1文字必要です" },
                                        maxLength: { value: 20, message: "名前は20文字までです" },
                                    })} placeholder="名前" />
                            <FormErrorMessage>
                                {errors.firstname && errors.firstname.message}
                            </FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <HStack>
                        <FormControl isInvalid={errors.lastnameFurigana !== undefined}>
                            <Input id="lastnameFuribana" {...register("lastnameFurigana", {
                                        required: "必須項目です",
                                        minLength: { value: 1, message: "苗字は最小1文字必要です" },
                                        maxLength: { value: 20, message: "苗字は20文字までです" },
                                    })} placeholder="苗字(ふりがな)" />
                            <FormErrorMessage>
                                {errors.lastnameFurigana && errors.lastnameFurigana.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.firstnameFurigana !== undefined}>
                            <Input id="firstnameFUrigana" {...register("firstnameFurigana", {
                                        required: "必須項目です",
                                        minLength: { value: 1, message: "名前は最小1文字必要です" },
                                        maxLength: { value: 20, message: "名前は20文字までです" },
                                    })} placeholder="名前(ふりがな)" />
                            <FormErrorMessage>
                                {errors.firstnameFurigana && errors.firstnameFurigana.message}
                            </FormErrorMessage>
                        </FormControl>
                    </HStack>
                    <Button type="submit" justifySelf="center">送信する</Button>
                </Box>
            </VStack>
        </Layout>
    )
}