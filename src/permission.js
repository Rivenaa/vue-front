import router from './router'
import store from '@/store'
import { message } from '@/libs'

router.beforeEach((to, from) => {
  // 无需登录的页面访问
  if (!to.meta.user) {
    return
  }

  // 已登录
  if (store.getters.token) {
    return true
  }

  // 需要登录才能访问的页面，并且用户没有登录
  message('warn', '登录失效，请重新登录')
  return '/'
})
