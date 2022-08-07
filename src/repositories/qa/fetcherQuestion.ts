import axios, { AxiosResponse } from "axios";
import router from "next/router";
import QAResponse from "../../types/api/qa/qaResponse";
import question from "../../types/domain/qa/question";


export const fetcherQuestion = (url: string): Promise<question[]> => {
    console.log('fetch question')
    return (
        axios.get(url)
        .then((res: AxiosResponse<QAResponse>) => {
            const { data, status } = res
            const resBody: question[] = data.data
            return resBody
        }
        ).catch(
            ({error}) => {
                router.replace("/500")
                return error
            }
        )
    )
};