import request from '@/service/index'

/**
 *  获取分类列表
 */
export const getCategory = () => {
  return request({
    url: '/category'
  })
}

/**
 *  获取 pexles 列表
 */
export const getPexlesList = params => {
  return request({
    url: '/pexels/list',
    params
  })
}
