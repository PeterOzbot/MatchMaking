import axios, { AxiosResponse, AxiosPromise } from 'axios'
import User, { UserCode } from '@/models/user'

const API_URL = 'http://localhost:8080/api/auth/'

class AuthService {
  public login(user: User): Promise<AxiosResponse<any>> {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(this.handleResponse)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem(UserCode, JSON.stringify(response.data))
        }

        return response.data
      })
  }

  public logout(): void {
    localStorage.removeItem(UserCode)
  }

  public register(user: User): Promise<AxiosResponse<any>> {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }

  private handleResponse(response: AxiosResponse): Promise<any> {
    if (response.status === 401) {
      this.logout()
      location.reload(true)

      const error = response.data && response.data.message
      return Promise.reject(error)
    }

    return Promise.resolve(response)
  }
}

export default new AuthService()
