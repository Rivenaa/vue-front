import { isMobileTerminal } from '@/utils/flexible'

export default {
  categories: state => state.category.categories,
  themeType: state => state.theme.themeType,
  currentCategory: state => state.app.currentCategory,
  currentCategoryIndex: (state, getters) => {
    console.log(getters.currentCategory.id)
    return getters.categories.findIndex(item => {
      return item.id === getters.currentCategory.id
    })
  },
  histories: state => state.search.histories,
  searchText: state => state.app.searchText,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  routerType: state => {
    if (!isMobileTerminal) {
      return 'none'
    }
    return state.app.routerType
  }
}
