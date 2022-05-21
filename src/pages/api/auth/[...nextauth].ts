import { toVarDefinition } from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import { Session } from 'inspector'
import NextAuth, { User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CognitoProvider from 'next-auth/providers/cognito'
import refreshAccessToken from '../../../entity/refreshTokens'

const refreshAccessToken = async(token: JWT) => {
    try {
        const url = process.env.COGNITO_API_URL!
        const clientId = process.env.COGNITO_CLIENT_ID!
        const response: AxiosResponse<refreshAccessToken> = await axios.post(url,
            {
                headers: {
                    "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
                    "Content-Type": "application/x-amz-json-1.1"
                },
                data:{
                    AuthFlow: "REFRESH_TOKEN_AUTH",
                    AuthParameters: {
                        REFRESH_TOKEN: token
                    },
                    ClientId: clientId
                }
            })
        const {data, status} = response
        if(status !== 200){
            throw Error
        }
        token.accessToken = data.AuthenticationResult.AccessToken
        token.accessTokenExpires = data.AuthenticationResult.ExpiresIn
        token.refreshToken = data.AuthenticationResult.RefreshToken
        token.idToken = data.AuthenticationResult.IdToken
        return token
    }catch(error){
        console.log("refreshTokenの更新に失敗しました")
        token.error = "RefreshAccessTokenError"
        return token
    }
}

export default NextAuth(
    {
        providers: [
            CognitoProvider({
                clientId: process.env.COGNITO_CLIENT_ID!,
                clientSecret: process.env.COGNITO_CLIENT_SECRET!,
                issuer: process.env.COGNITO_ISUUE!,
            })
        ],
        callbacks: {
            session: async ({session, token}) => {
              return Promise.resolve({
                ...session,
                idToken: token.idToken
              })
            },
            jwt : async ({ token, user, account }) => {
                // Persist the OAuth access_token to the token right after signin
                if (account && user) 
                {
                    token.accessToken = account.access_token,
                    token.accessTokenExpires = Date.now() + account.expires_at! * 1000,
                    token.refreshToken = account.refresh_token,
                    token.idToken = account.id_token
                    return token
                }
                if (Date.now() < (token.accessTokenExpires as number)) {
                    return token
                }
                return refreshAccessToken(token)
            }
        }
    }
)