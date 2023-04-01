// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookieKey } from './constants/cookies'

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
    const cookie = request.cookies.get(cookieKey)
    const idToken = cookie?.value
    console.log('idToken', idToken)

    if (!idToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    // const token = await adminAuth.verifyIdToken(idToken)
    // console.log(token)
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/qa/:path+', '/profile/:path*'],
}
