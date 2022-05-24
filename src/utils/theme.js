import { watch } from 'vue'
import { THEME_ARR } from '@/constants/index'
import store from '../store'

let matchMedia

export default () => {
  watch(
    () => store.getters.themeType,
    val => changeTheme(val),
    { immediate: true } // 初始执行一次
  )
}

function watchSystemThemeChange() {
  if (matchMedia) return
  // 初始化
  matchMedia = window.matchMedia('(prefers-color-scheme:dark)')
  // 监听主题变化
  matchMedia.onchange = () => {
    changeTheme('theme-system')
  }
}

function changeTheme(theme) {
  let themeClassName = ''

  switch (theme) {
    case THEME_ARR[0].icon:
      themeClassName = ''
      break
    case THEME_ARR[1].icon:
      themeClassName = 'dark'
      break
    case THEME_ARR[2].icon:
      watchSystemThemeChange()
      themeClassName = matchMedia.matches ? 'dark' : ''
  }

  document.querySelector('html').className = themeClassName
}
