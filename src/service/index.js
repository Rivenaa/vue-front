import axios from 'axios'
import store from '../store'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

/* 请求拦截器 */
service.interceptors.request.use(
  config => {
    config.headers.icode = '12FB0583C72B6591'
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { data, success, message } = response.data
    if (success) {
      return data
    } else {
      return Promise.reject(new Error(message))
    }
  },
  error => {
    if (error.response?.data?.code === 401) {
      store.dispatch('user/logout')
    }
    return Promise.reject(error)
  }
)

export default service
