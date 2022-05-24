import { THEME_ARR } from '@/constants'

export default {
  namespaced: true,
  state: () => ({
    themeType: THEME_ARR[0].icon //当前主题模式
  }),
  mutations: {
    setThemeType(state, newTheme) {
      state.themeType = newTheme
    }
  }
}
