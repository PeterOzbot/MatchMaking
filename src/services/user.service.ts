import axios, { AxiosResponse } from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/api/test/'

class UserService {
  public getPublicContent(): Promise<AxiosResponse<any>> {
    return axios.get(API_URL + 'all')
  }

  public getUserBoard(): Promise<AxiosResponse<any>> {
    return axios.get(API_URL + 'user', { headers: authHeader() })
  }

  public getAdminBoard(): Promise<AxiosResponse<any>> {
    return axios.get(API_URL + 'admin', { headers: authHeader() })
  }
}

export default new UserService()
