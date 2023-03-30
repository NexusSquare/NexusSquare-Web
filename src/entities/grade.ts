export const gradeList = ['1年生', '2年生', '3年生', '4年生', '大学院1年生', '大学院2年生'] as const

export const Grades: Grade[] = [
    { value: 'B1', label: '1年生' },
    { value: 'B2', label: '2年生' },
    { value: 'B3', label: '3年生' },
    { value: 'B4', label: '4年生' },
    { value: 'M1', label: '大学院1年生' },
    { value: 'M2', label: '大学院2年生' },
]

export type Grade = {
    value: string
    label: string
}
