import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '../constants'

const { width } = useWindowSize()

/**
 *  根据屏幕宽度 判断设备是否为移动设备
 */
export const isMobileTerminal = computed(() => {
  return width.value < PC_DEVICE_WIDTH
})
