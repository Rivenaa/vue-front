import { ref, onMounted, computed, watch, nextTick, onUnmounted } from 'vue'

export default function useWaterfall(props) {
  // data
  const containerTarget = ref(null) // 容器实例
  const containerWidth = ref(0) // 容器宽度
  const containerHeight = ref(0) // 容器高度
  const columnWidth = ref(0)
  let columnHeightObj = {} // 每列高度
  let itemHeights = [] // 所有item高度

  // onMounted
  onMounted(() => {
    useColumnWidth()
  })

  // onUnmounted
  onUnmounted(() => {
    props.data.forEach(item => {
      delete item._style
    })
  })

  // computed
  const columnSpacingTotal = computed(
    () => (props.column - 1) * props.columnSpacing
  )

  // watch
  watch(
    () => props.data,
    async newData => {
      // 重置数据源
      const resetColumnHeight = newData.every(item => !item._style)
      if (resetColumnHeight) {
        // 构建高度记录容器
        ctColumnHeightObj()
      }
      await nextTick()
      if (props.picturePreReading) {
        waitImgComplate()
      } else {
        useItemHeight()
      }
    },
    {
      immediate: true,
      deep: true
    }
  )

  watch(
    // 监听列数的变化
    () => props.column,
    () => {
      if (props.picturePreReading) {
        columnWidth.value = 0
        reset()
      } else {
        reset()
      }
    }
  )

  // methods
  function useContainerWidth() {
    containerWidth.value = containerTarget.value.offsetWidth
  }

  function useColumnWidth() {
    useContainerWidth()
    columnWidth.value =
      (containerWidth.value - columnSpacingTotal.value) / props.column
  }

  function ctColumnHeightObj() {
    columnHeightObj = {}
    for (let i = 0; i < props.column; i++) {
      columnHeightObj[i] = 0
    }
  }

  // 图片预加载
  function waitImgComplate() {
    itemHeights = []
    let itemEls = [...document.getElementsByClassName('waterfall-item')] // 获取所有item元素
    const imgEls = []
    itemEls.forEach(el => {
      imgEls.push(...el.getElementsByTagName('img')) // 获取所有 item 元素下的 img标签
    })
    const imgAllSrc = imgEls.map(item => item.src) // 获取所有 img 标签的 src
    onComplateImgs(imgAllSrc).then(() => {
      // 图片加载完成，获取高度
      itemEls.forEach(el => {
        itemHeights.push(el.offsetHeight)
      })
      // 渲染位置
      useItemLocation()
    })
  }

  // 无需预加载
  function useItemHeight() {
    itemHeights = []
    let itemEls = [...document.getElementsByClassName('waterfall-item')] // 获取所有item元素
    itemEls.forEach(el => {
      itemHeights.push(el.offsetHeight)
    })
    // 渲染位置
    useItemLocation()
  }

  // 生成每个item对应位置
  function useItemLocation() {
    // 变量数据源
    props.data.forEach((item, index) => {
      if (item._style) return // 避免重复计算
      item._style = {} // 生成style属性

      // 获取最小高度的值 和 最小高度所在的列
      const { minHeight, minHeightColumn } = getMinHeightColumn()

      item._style.top = minHeight // top
      item._style.left = // left
        minHeightColumn * (columnWidth.value + props.columnSpacing)

      // 指定列高度自增
      increasingHeight(index)
    })
    // 最后生成容器高度
    containerHeight.value = Math.max(...Object.values(columnHeightObj))
  }

  // 指定列高度自增
  function increasingHeight(index) {
    const { minHeightColumn } = getMinHeightColumn()
    columnHeightObj[minHeightColumn] += itemHeights[index] + props.rowSpacing
  }

  // 重新构建瀑布流
  function reset() {
    setTimeout(() => {
      useColumnWidth() // 重新计算列宽
      // 重置所有的定位数据，因为 data 中进行了深度监听，所以该操作会触发 data 的 watch
      props.data.forEach(item => {
        item._style = null
      })
    }, 250)
  }

  function getMinHeightColumn() {
    const minHeight = Math.min(...Object.values(columnHeightObj)) // 获取最小高度的值
    const minHeightColumn = Object.keys(columnHeightObj).find(key => {
      return columnHeightObj[key] === minHeight // 获取最小高度所在的列
    })
    return { minHeight, minHeightColumn }
  }

  return { containerTarget, containerHeight, columnWidth }
}

/* 监听图片数据加载完成 */
function onComplateImgs(imgs) {
  // promise 集合
  const promiseArr = []
  // 循环构建 promiseArr
  imgs.forEach((img, index) => {
    promiseArr[index] = new Promise((resolve, reject) => {
      const imageObj = new Image()
      imageObj.src = img
      imageObj.onload = () => {
        resolve({
          img,
          index
        })
      }
    })
  })
  return Promise.all(promiseArr)
}
