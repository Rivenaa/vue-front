<template>
  <div class="overflow-auto flex flex-col items-center">
    <Svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200"
      @click="close"
    />
    <img :src="blob" ref="imageTarget" alt="" />
    <Button class="mt-4 w-[80%] lg:w-[70%]" @click="onConfirmClick">
      确定
    </Button>
  </div>
</template>

<script>
const EMITS_CLOSE = 'close'

// pc端配置对象
const pcOptions = {
  aspectRatio: 1
}

// 移动端
const mobileOptions = {
  aspectRatio: 1,
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}
</script>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { onMounted, ref } from 'vue'
import { getOSSClient } from '@/utils/sts'
import { useStore } from 'vuex'
import { message } from '@/libs'
import { putProfile } from '@/api'

defineProps({
  blob: {
    type: String,
    required: true
  }
})

const store = useStore()
const emits = defineEmits([EMITS_CLOSE])
const loading = ref(false)
let cropper
let ossClient

// 图片裁剪
const imageTarget = ref(null)
onMounted(() => {
  cropper = new Cropper(
    imageTarget.value,
    isMobileTerminal.value ? mobileOptions : pcOptions,
    {
      corp(event) {
        console.log(event.detail.x)
        console.log(event.detail.y)
        console.log(event.detail.width)
        console.log(event.detail.height)
        console.log(event.detail.rotate)
        console.log(event.detail.scaleX)
        console.log(event.detail.scaleY)
      }
    }
  )
})

function close() {
  emits(EMITS_CLOSE)
}

function onConfirmClick() {
  emits(EMITS_CLOSE)
  loading.value = true
  // 拿到裁剪后的图片
  cropper.getCroppedCanvas().toBlob(blob => {
    // 裁剪后的 blob 地址
    putObjectToOSS(blob)
  })
}

// 进行 OSS 上传
async function putObjectToOSS(file) {
  if (!ossClient) {
    ossClient = await getOSSClient()
  }
  const fileTypeArray = file.type.split('/')
  const fileName = `${store.getters.userInfo.username}/${Date.now()}.${
    fileTypeArray[1]
  }`

  try {
    // 两个参数 1.路径 2.file
    const res = await ossClient.put(`images/${fileName}`, file)
    console.log(res.url)
    onChangeProfile(res.url)
  } catch (e) {
    message('error', e.message)
  }
}

/* 上传图片到服务器 */
async function onChangeProfile(avatar) {
  // 更新本地数据
  store.commit('user/setUserInfo', {
    ...store.getters.userInfo,
    avatar
  })
  // 更新服务器数据
  await putProfile(store.getters.userInfo)
  message('success', '用户头像修改成功')
  loading.value = false
  close()
}
</script>

<style lang="scss" scoped></style>
