type AuthenticationResult = {
    AccessToken: string
    ExpiresIn: number
    IdToken: string
    RefreshToken: string
}
type refreshAccessToken = {
    AuthenticationResult: AuthenticationResult
}
export default refreshAccessToken
