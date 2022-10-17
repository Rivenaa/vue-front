import request from '@/service/index'

/* 获取分类列表 */
export const getCategory = () => {
  return request({
    url: '/category'
  })
}

/* 获取 pexels 列表 */
export const getPexelsList = params => {
  return request({
    url: '/pexels/list',
    params
  })
}

/* 获取搜索提示 */
export const getHint = q => {
  return request({
    url: '/pexels/hint',
    params: { q }
  })
}

/* 获取主题 */
export const getThemes = () => {
  return request({
    url: '/pexels/themes'
  })
}

/* 获取指定图片数据 */
export const getPexels = id => {
  return request({
    url: `/pexels/${id}`
  })
}

/* 人类行为验证 */
export const getCaptcha = data => {
  return request({
    url: '/sys/Captcha',
    method: 'post',
    data
  })
}

/* 登录模块 */
export const loginUser = data => {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/* 用户信息 */
export const getProfile = () => {
  return request({
    url: '/user/profile'
  })
}

/* 账号注册 */
export const registerUser = data => {
  return request({
    url: '/sys/register',
    method: 'post',
    data
  })
}

/* 修改个人信息 */
export const putProfile = data => {
  return request({
    url: '/user/profile',
    method: 'put',
    data
  })
}

/* 获取 OSS 上传凭证 */
export const getSts = () => {
  return request({
    url: '/user/sts'
  })
}

/* 获取VIP支付数据 */
export const getVipPayList = () => {
  return request({
    url: '/user/vip/pay/list'
  })
}
