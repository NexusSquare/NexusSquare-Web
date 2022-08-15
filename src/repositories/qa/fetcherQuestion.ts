import axios, { AxiosResponse } from 'axios'
import router from 'next/router'
import QAResponse from '../../types/api/res/qa/qaResponse'
import Question from '../../types/domain/qa/Question'

export const fetcherQuestion = (url: string): Promise<Question[]> => {
    console.log('fetch question')
    return axios
        .get(url)
        .then((res: AxiosResponse<QAResponse>) => {
            const { data, status } = res
            const resBody: Question[] = data.data
            return resBody
        })
        .catch(({ error }) => {
            router.replace('/500')
            return error
        })
}
