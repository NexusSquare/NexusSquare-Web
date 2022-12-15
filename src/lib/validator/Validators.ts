import { EMAIL_PATTERN } from '../../constants/emailPattern'
import { Validator } from './types'

class Validators {
    public requiredForText(fieldName: string): Validator<string> {
        return (value) => (Boolean(value) && /\S/.test(value)) || `${fieldName}は必須項目です`
    }
    public requiredMinLength(fieldName: string, length: number): Validator<string> {
        return (value) => value.length >= length || `${fieldName}は最小${length}文字必要です`
    }
    public requiredMaxLength(fieldName: string, length: number): Validator<string> {
        return (value) => value.length <= length || `${fieldName}は最大${length}文字までです`
    }
    public requiredForEmailPatter(): Validator<string> {
        return (value) => Boolean(value.match(EMAIL_PATTERN)) || `愛知県立大学のメールアドレスを入力してください`
    }
    public requiredForPassword(): Validator<string> {
        const PASSWORD_REGEX = /^(?=.*?[a-zA-z])(?=.*?\d)[a-zA-z\d]{1,100}$/i
        return (value) => Boolean(value.match(PASSWORD_REGEX)) || `半角英数を含めて下さい`
    }
}

export const validators = new Validators()
