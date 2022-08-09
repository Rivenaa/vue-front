import { ALL_CATEGORY_ITEM } from '@/constants/index'

export default {
  namespaced: true,
  state: () => ({
    currentCategory: ALL_CATEGORY_ITEM,
    searchText: '',
    routerType: 'none'
  }),
  mutations: {
    setCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    },
    setSearchText(state, newText) {
      state.searchText = newText
    },
    setRouterType(state, newRouterType) {
      state.routerType = newRouterType
    }
  }
}
