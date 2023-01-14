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
        'text/plain': ['.txt', '.html'],
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

const handleOpen = async () => {
  await open()
  const jsonText = `[${data.value}]`
  const replaceQua = jsonText.replace(/\'/g, '\"')
  const toJsonData = JSON.parse(replaceQua)
  console.warn(toJsonData)
  fileShow.value = true
  mapCityFeatures.value = cleanCity(toJsonData)
  operationShow.value = false
}
</script>

<template>
  <Transition>
    <div v-if="operationShow" class="absolute left-10px top-55px rounded-20px p-5 z-10 bg-white dark:bg-dark lt-sm:max-w-300px">
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

  <ASpace class="absolute left-10px top-10px z-100">
    <AButton @click="toggle">
      <template #icon>
        <icon-eye v-if="!operationShow" />
        <icon-eye-invisible v-else />
      </template>
      {{ operationShow ? '隐藏' : '显示' }}
    </AButton>
    <a-button type="dashed" @click="handleOpen()">
      <template #icon>
        <icon-upload />
      </template>
      导入并替换数据
    </a-button>
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
