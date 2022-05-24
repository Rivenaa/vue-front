import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants/index'
import { getCategory } from '@/api/index.js'

export default {
  namespaced: true,
  state: () => ({
    categorys: CATEGORY_NOMAR_DATA
  }),
  mutations: {
    setCategorys(state, newCategorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...newCategorys]
    }
  },
  actions: {
    async getCategorys(context) {
      const res = await getCategory()
      const { categorys } = await getCategory()
      context.commit('setCategorys', categorys)
    }
  }
}
