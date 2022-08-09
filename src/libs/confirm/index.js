import { h, render } from 'vue'
import confirmComponent from './index.vue'

export function confirm(title, content, cancelText, confirmText) {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title
      title = ''
    }

    function cancelHandler() {
      reject(new Error('取消按钮点击'))
    }

    function confirmHandler() {
      resolve()
    }

    function close() {
      render(null, document.body)
    }

    // 生成 vnode
    const vnode = h(confirmComponent, {
      title,
      content,
      cancelText,
      confirmText,
      cancelHandler,
      confirmHandler,
      close
    })

    // render 渲染
    render(vnode, document.body)
  })
}
