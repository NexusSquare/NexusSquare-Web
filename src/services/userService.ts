import { Timestamp } from 'firebase/firestore'
import { DEFAULT_AVATAR_IMAGE_URL } from '../constants/image'
import { USER_ID } from '../constants/token'
import { db } from '../plugins/firebase'
import { userRepository } from '../repositories/userRepoisitory'
import { UserReq } from '../types/api/req/userReq'
import { User } from '../types/domain/user'

export const userService = {
    async findOne(uid: string): Promise<User> {
        return userRepository.findOne(uid)
    },
    async save(userReq: UserReq): Promise<void> {
        const userId = sessionStorage.getItem(USER_ID)
        const user: User = {
            department: userReq.isDepartmentAnonymous ? null : userReq.department,
            subject: userReq.isDepartmentAnonymous ? null : userReq.subject,
            grade: userReq.isDepartmentAnonymous ? null : userReq.grade,
            nickname: userReq.nickname,
            imageUrl: userReq.imageUrl ? userReq.imageUrl : DEFAULT_AVATAR_IMAGE_URL,
            updateAt: Timestamp.now(),
            createAt: Timestamp.now(),
            isDepartmentAnonymous: userReq.isDepartmentAnonymous,
            point: 0,
            totalPoint: 0,
        }
        return userRepository.save(user, userId!)
    },
}
