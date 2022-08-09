import { h, render } from 'vue'
import messageComponent from './index.vue'

export function message(type, content, duration) {
  function onDestroy() {
    render(null, document.body)
  }

  const vnode = h(messageComponent, {
    type,
    content,
    duration,
    destroy: onDestroy
  })

  render(vnode, document.body)
}
