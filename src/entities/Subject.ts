import { Departments } from './Department'

export const Foreign = {
    eng: '英米学科',
    france: 'ヨーロッパ学科フランス語圏専攻',
    spanish: 'ヨーロッパ学科スペイン語専攻',
    german: 'ヨーロッパ学科ドイツ語圏専攻',
    portugal: 'ヨーロッパ学科ポルトガル圏専攻',
    chinese: '中国学科',
    global: '国際関係学科',
} as const

export const Globalre = {
    global: '国際文化専攻',
    japan: '日本文化専攻',
} as const

export const Humanre = {
    human: '人間発達学専攻',
} as const

export const Info = {
    info: '情報科学科',
} as const

export const Japan = {
    japanese: '国語国文学科',
    history: '歴史文化学科',
} as const

export const Nurse = {
    nurse: '看護学科',
} as const

export const Teach = {
    raise: '教育発達学科',
    social: '社会福祉学科',
} as const

export const Infore = {
    info: '情報システム専攻',
    media: 'メディア情報専攻',
    system: 'システム科学専攻',
} as const

export const Nursere = {
    basic: '看護基礎科学',
    general: '総合看護学',
    clinical: '臨床看護学',
    wide: '広域看護学',
    health: 'ウィメンズヘルス・助産学',
} as const

export const departmentToSubject = (department: string): string[] => {
    switch (department) {
        case Departments.FOREIGN_LANGRAGE:
            return Object.values(Foreign)
        case Departments.JAPANESE_CULTURE:
            return Object.values(Japan)
        case Departments.TEACH_WELFARE:
            return Object.values(Teach)
        case Departments.NURSE:
            return Object.values(Nurse)
        case Departments.INFORMATION_SCIENCE:
            return Object.values(Info)
        case Departments.GLOBAL_CULTURE:
            return Object.values(Globalre)
        case Departments.HUMAN_DEVELOPMENT:
            return Object.values(Humanre)
        case Departments.NURSE_SCIENCE:
            return Object.values(Nursere)
        case Departments.INFORMATION_SCIENCE_RESEARCH:
            return Object.values(Infore)
        default:
            return []
    }
}
