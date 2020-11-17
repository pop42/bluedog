import {MessageDb} from '../../message_db'

type Role = 'owner' | 'user'

export interface UserProjection {
  id: string
  firstName: string
  lastName: string
  emailAddress: string
  role: Role
  companyId: string
  isEmailVerified: boolean
  isEmailVerificationSent: boolean
  isRegistered: boolean
  isCompanyJoined: boolean
  sequence: number
}

const projection = {
  init() {
    return {
      id: null,
      firstName: null,
      lastName: null,
      emailAddress: null,
      role: null,
      companyId: null,
      isCompanyJoined: false,
      isEmailVerified: false,
      isEmailVerificationSent: false,
      isRegistered: false,
      sequence: 0,
    }
  },
  UserRegistered(user: UserProjection, event) {
    user.id = event.data.userId
    user.firstName = event.data.firstName
    user.lastName = event.data.lastName
    user.emailAddress = event.data.emailAddress
    user.isRegistered = true
    return user
  },
  EmailVerificationSent(user: UserProjection) {
    user.isEmailVerificationSent = true
    return user
  },
  EmailVerified(user: UserProjection) {
    user.isEmailVerified = true
    return user
  },
  CompanyJoined(user: UserProjection, event) {
    user.isCompanyJoined = true
    user.sequence = event.globalPosition
    user.companyId = event.data.companyId
    user.role = event.data.role
    return user
  },
  JoinCompanyFailed(user: UserProjection, event) {
    user.sequence = event.globalPosition
    return user
  },
}

export const loadUser = async (userId: string, messageDb: MessageDb) => {
  const streamName = `user-${userId}`
  return await messageDb.fetch(streamName, projection) as UserProjection
}

