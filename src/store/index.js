import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  getters,
  modules: {
    category,
    theme
  },
  plugins: [
    createPersistedState({
      key: 'vue-front', // 指定保存到 localStorage 中的key
      paths: ['category', 'theme'] // 需要保存的模块
    })
  ]
})

export default store
