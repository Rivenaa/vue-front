import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import 'dayjs/locale/zh-cn'

// 处理中文国际化
dayjs.locale('zh')
// 插件：支持时间长度
dayjs.extend(duration)

export default dayjs
