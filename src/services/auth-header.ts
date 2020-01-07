import { IAuthHeader } from '@/models/authHeader'
import { UserCode } from '@/models/user'

export default function authHeader(): IAuthHeader {
  let authHeader: IAuthHeader = {}
  let storedUser = localStorage.getItem(UserCode)
  if (storedUser) {
    let user = JSON.parse(storedUser)
    if (user && user.accessToken) {
      authHeader.Authorization = 'Bearer ' + user.accessToken
    }
  }

  return authHeader
}
