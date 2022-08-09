import { defineAsyncComponent } from 'vue'
export { confirm } from './confirm/index'
export { message } from './message/index'
import nameCase from '@/utils/nameCase'

export default {
  install(app) {
    const components = import.meta.glob('./*/index.vue')
    for (const [fullPath, fn] of Object.entries(components)) {
      const componentName = nameCase(fullPath.replace('./', '').split('/')[0])
      app.component(componentName, defineAsyncComponent(fn))
    }
  }
}
