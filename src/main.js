import { createApp } from 'vue'
import { useREM } from './utils/flexible'
import useTheme from './utils/theme'
import App from './App.vue'
import router from './router'
import store from './store'
import libs from './libs'
import directives from './directives'
import './styles/index.scss'
//注册svg-icons
import 'virtual:svg-icons-register'
import './permission'

useTheme()
useREM()
createApp(App).use(router).use(store).use(libs).use(directives).mount('#app')
