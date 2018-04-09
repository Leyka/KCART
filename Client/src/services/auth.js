import Api from './api'

export default {
  login (credentials) {
    return Api().post('login', credentials)
  },
  register (user) {
    return Api().post('register', user)
  }
}
