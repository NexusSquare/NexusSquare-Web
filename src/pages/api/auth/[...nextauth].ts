import NextAuth from 'next-auth'
import CognitoProvider from 'next-auth/providers/cognito'

export default NextAuth(
    {
        providers: [
            CognitoProvider({
                clientId: (process.env.COGNITO_CLIENT_ID) ? process.env.COGNITO_CLIENT_ID : '',
                clientSecret: (process.env.COGNITO_CLIENT_SECRET) ? process.env.COGNITO_CLIENT_SECRET : '',
                issuer: (process.env.COGNITO_ISUUE) ? process.env.COGNITO_ISUUE : ''
            })
        ]
    }
)