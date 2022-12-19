<script lang="ts" setup>
import type { MyFeature } from '~/composables/index'
const router = useRouter()
const route = useRoute()
const dataVisible = ref(false)
const decodeData = ref<MyFeature[]>([])
const handleMailto = () => {
  const encodeData = encodeStr(mapFeatures.value)
  router.replace({
    hash: route.hash,
    query: {
      data: encodeData,
    },
  })
  const aLink = document.createElement('a')
  aLink.href = `mailto:zhangchao564265135@qq.com?subject=New Info From MAPSHARE&body=${location.href}`
  aLink.style.display = 'none'
  // 触发点击
  document.body.appendChild(aLink)
  aLink.click()
  // 然后移除
  document.body.removeChild(aLink)
}
const handleOk = () => {
  //
  mapFeatures.value = decodeData.value
  router.replace({
    hash: route.hash,
  })
}
const handleCancel = () => {
  //
}
onMounted(() => {
  if (route.query.data) {
    decodeData.value = decodeStr(route.query.data as string)
    if (decodeData.value.length > 0)
      dataVisible.value = true
  }
})
</script>

<template>
  <div class="px-3 flex relative">
    <div class="font-extrabold flex items-center text-base justify-center">
      <button icon-btn @click="toggleDark()">
        <div dark:i-carbon-moon i-carbon-sun />
      </button>
      <div class="ml-2">
        地图编辑器
      </div>
    </div>
    <div class="flex-auto" />
    <div class="flex-grow flex justify-end">
      <div style="height: 42px" />
      <div class="flex items-center" style="font-size: 10px">
        <ASpace class="pr-3 lt-sm:hidden">
          <a-button v-if="isEdit" type="text" @click="handleMailto()">
            <template #icon>
              <icon-email />
            </template>
            邮件反馈
          </a-button>
          <a-modal v-model:visible="dataVisible" @ok="handleOk" @cancel="handleCancel">
            <template #title>
              数据导入
            </template>
            <div>似乎有{{ decodeData.length }}条数据可以导入</div>
          </a-modal>
        </ASpace>
        <div class="lt-sm:hidden flex pl-3 border-l border-solid border-light-6 dark:border-gray-6 h-full items-center">
          <ASpace>
            <a-button v-if="isEdit" type="text" @click="handleMapExitEdit">
              <template #icon>
                <icon-export />
              </template>
              退出编辑
            </a-button>
            <a-button v-else type="text" @click="handleMapEdit">
              <template #icon>
                <icon-edit />
              </template>
              编辑地图
            </a-button>
            <a-dropdown :popup-max-height="false">
              <a-button>未登录 <icon-down /></a-button>
              <template #content>
                <a-doption>Option 1</a-doption>
                <a-doption disabled>
                  Option 2
                </a-doption>
                <a-doption>Option 3</a-doption>
                <a-doption>Option 4</a-doption>
              </template>
            </a-dropdown>
          </ASpace>
        </div>
        <div class="sm:hidden" @click="handleCollapsedFalse()">
          在PC编辑与添加
        </div>
      </div>
    </div>
    <div
      class="absolute top-1/2 left-1/2" :style="{
        transform: 'translate(-50%, -50%)',
      }"
    >
      <div>
        <ToolBar v-show="isEdit" />
      </div>
    </div>
  </div>
</template>
