export const Departments = {
    FOREIGN_LANGRAGE: '外国語学部',
    JAPANESE_CULTURE: '日本文化学部',
    TEACH_WELFARE: '教育福祉学部',
    NURSE: '看護学部',
    INFORMATION_SCIENCE: '情報科学部',
    GLOBAL_CULTURE: '国際文化研究科',
    HUMAN_DEVELOPMENT: '人間発達学研究科',
    NURSE_SCIENCE: '看護学研究科',
    INFORMATION_SCIENCE_RESEARCH: '情報科学研究科',
}

export const MasterGroup = [
    Departments.INFORMATION_SCIENCE_RESEARCH,
    Departments.NURSE_SCIENCE,
    Departments.HUMAN_DEVELOPMENT,
    Departments.GLOBAL_CULTURE,
]

export const BachelorGroup = [
    Departments.FOREIGN_LANGRAGE,
    Departments.JAPANESE_CULTURE,
    Departments.TEACH_WELFARE,
    Departments.NURSE,
    Departments.INFORMATION_SCIENCE,
]

export const isMaster = (department: string): boolean => {
    return MasterGroup.includes(department)
}

export const isBachelor = (department: string): boolean => {
    return BachelorGroup.includes(department)
}
