import axios, { AxiosInstance } from 'axios'

export const clientApi: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL!,
    headers: { 'Content-Type': 'application/json' },
})
export const qaApi: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_QA_API_URL!,
    headers: { 'Content-Type': 'application/json', Authorization: process.env.NEXT_PUBLIC_QA_TOKEN! },
})
