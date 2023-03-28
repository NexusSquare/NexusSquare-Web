export interface PasswordService {
    sendResetEmail(email: string): Promise<void>
    update(password: string): Promise<void>
}
