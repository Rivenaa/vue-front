import { createStore } from 'vuex'
import app from './modules/app'
import category from './modules/category'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import search from './modules/search'
import theme from './modules/theme'
import user from './modules/user'

const store = createStore({
  getters,
  modules: {
    app,
    category,
    search,
    theme,
    user
  },
  plugins: [
    createPersistedState({
      key: 'vue-front', // 指定保存到 localStorage 中的key
      paths: ['category', 'theme', 'search', 'user'] // 需要保存的模块
    })
  ]
})

export default store
