import { ALL_CATEGORY_ITEM, CATEGORY_DEFAULT_DATA } from '@/constants/index'
import { getCategory } from '@/api/index.js'

export default {
  namespaced: true,
  state: () => ({
    categories: CATEGORY_DEFAULT_DATA
  }),
  mutations: {
    setCategories(state, newCategories) {
      state.categories = [ALL_CATEGORY_ITEM, ...newCategories]
    }
  },
  actions: {
    async getCategories(context) {
      const { categorys: categories } = await getCategory()
      context.commit('setCategories', categories)
    }
  }
}
