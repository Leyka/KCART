import Api from './api'

export default {
  all () {
    return Api().get('ads')
  }
}
