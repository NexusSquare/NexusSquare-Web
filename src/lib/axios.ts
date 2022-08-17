import axios, { AxiosInstance } from 'axios'
import { useSession } from 'next-auth/react'
export const clientApi: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL!,
    headers: { 'Content-Type': 'application/json' },
})
export const qaApi: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_QA_API_URL!,
    headers: { 'Content-Type': 'application/json' },
})
