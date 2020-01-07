import AuthService from '../services/auth.service'
import User, { UserCode } from '@/models/user'
import { AuthState, AuthStatus } from './auth.state'

let storedUser = localStorage.getItem(UserCode)
let user = null;
if (storedUser) {
  user = JSON.parse(storedUser)
}
const initialState = user
  ? new AuthState(user, new AuthStatus(true))
  : new AuthState(null, new AuthStatus(false))

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }: { commit: any }, user: User) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user)
          return Promise.resolve(user)
        },
        error => {
          commit('loginFailure')
          return Promise.reject(error.response.data)
        }
      )
    },
    logout({ commit }: { commit: any }) {
      AuthService.logout()
      commit('logout')
    },
    register({ commit }: { commit: any }, user: User) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess')
          return Promise.resolve(response.data)
        },
        error => {
          commit('registerFailure')
          return Promise.reject(error.response.data)
        }
      )
    }
  },
  mutations: {
    loginSuccess(state: any, user: User) {
      state.status = { loggedIn: true }
      state.user = user
    },
    loginFailure(state: any) {
      state.status = {}
      state.user = null
    },
    logout(state: any) {
      state.status = {}
      state.user = null
    },
    registerSuccess(state: any) {
      state.status = {}
    },
    registerFailure(state: any) {
      state.status = {}
    }
  }
}
