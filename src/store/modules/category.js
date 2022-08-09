import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants/index'
import { getCategory } from '@/api/index.js'

export default {
  namespaced: true,
  state: () => ({
    categories: CATEGORY_NOMAR_DATA
  }),
  mutations: {
    setCategories(state, newCategories) {
      state.categories = [ALL_CATEGORY_ITEM, ...newCategories]
    }
  },
  actions: {
    async getCategories(context) {
      const { categorys } = await getCategory()
      context.commit('setCategories', categorys)
    }
  }
}
