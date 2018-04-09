import axios from 'axios'
import { store } from '@/store'

export default () => (
  axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      Authorization: `bearer ${store.state.token}`
    }
  })
)
