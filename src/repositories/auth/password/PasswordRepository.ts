export interface PasswordRepository {
    sendResetEmail(email: string): Promise<void>
    // signIn(email: string, password: string): Promise<void>
    // signOut(): Promise<void>
    // signUp(email: string, password: string): Promise<void>
    // updatePassword(password: string): Promise<void>
}
