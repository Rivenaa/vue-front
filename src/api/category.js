import request from '@/service/index'

/**
 *  获取分类列表
 */
export const getCategory = () => {
  return request({
    url: '/category'
  })
}
