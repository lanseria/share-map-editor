<script lang="ts" setup>
import { cleanCity, fileShow, mapCityFeatures, operationShow } from '~/composables'

const toggle = () => {
  operationShow.value = !operationShow.value
  fileShow.value = false
}
const { open, isSupported, file, fileName, fileMIME, fileSize, fileLastModified, data } = useFileSystemAccess({
  dataType: 'Text',
  types: [
    {
      description: 'text',
      accept: {
        'application/json': ['.json'],
      },
    },
  ],
  excludeAcceptAllOption: true,
})
const str = JSON.stringify(reactive({
  isSupported,
  file,
  fileName,
  fileMIME,
  fileSize,
  fileLastModified,
}))

const { workerFn, workerStatus, workerTerminate } = useWebWorkerFn((d: string) => {
  // some heavy works to do in web worker
  // const jsonText = `[${d}]`
  // const removeTypeRegex1 = /'type': "(.*?)",\w/
  // let removeTypeStr = jsonText.replace(removeTypeRegex1, '')
  // const removeTypeRegex2 = /'type': '(.*?)',\w/
  // removeTypeStr = removeTypeStr.replace(removeTypeRegex2, '')
  // const replaceQua = removeTypeStr.replace(/\'/g, '\"')
  const toJsonData = JSON.parse(d)
  console.warn(toJsonData)
  return toJsonData
})
const running = computed(() => workerStatus.value === 'RUNNING')

const handleOpen = async () => {
  await open()
  if (data) {
    console.warn('process')
    const toJsonData = await workerFn(data.value as string)
    fileShow.value = true
    mapCityFeatures.value = cleanCity(toJsonData)
    operationShow.value = false
  }
}
const clearStorage = () => {
  localStorage.clear()
  location.reload()
}
</script>

<template>
  <Transition>
    <div v-if="operationShow" class="absolute left-10px top-55px rounded-20px p-5 z-10 bg-white dark:bg-dark w-600px">
      <MapLayer />
      <a-divider />
      <MapSearch />
      <a-divider />
      <MapResult />
    </div>
  </Transition>

  <Transition>
    <pre v-if="fileShow" class="absolute left-10px top-55px rounded-20px p-5 z-10 bg-white dark:bg-dark" lang="yaml">{{ str }}</pre>
  </Transition>

  <ASpace class="absolute left-10px top-10px z-100 bg-white dark:bg-dark">
    <AButton @click="toggle">
      <template #icon>
        <icon-eye v-if="!operationShow" />
        <icon-eye-invisible v-else />
      </template>
      {{ operationShow ? '隐藏' : '显示' }}
    </AButton>
    <a-button v-if="!running" type="dashed" @click="handleOpen()">
      <template #icon>
        <icon-upload />
      </template>
      导入并替换数据
    </a-button>

    <a-button v-else type="dashed" @click="workerTerminate('PENDING')">
      <template #icon>
        <icon-upload />
      </template>
      处理中
    </a-button>

    <AButton @click="clearStorage">
      清空重置
    </AButton>
  </ASpace>
</template>

<style lang="css" scoped>
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
