<script lang="ts" setup>
import { activeTab } from '~/composables/store'
interface TabItem {
  label: string
  icon: string
  value: string
}
const tabList: TabItem[] = [
  {
    label: '编辑要素',
    icon: 'i-carbon:edit',
    value: 'edit',
  },
  {
    label: '数据',
    icon: 'i-carbon:data-table',
    value: 'data',
  },
  {
    label: '帮助',
    icon: 'i-carbon:help',
    value: 'help',
  },
]

const handleActive = (item: TabItem) => {
  activeTab.value = item.value
}
</script>

<template>
  <div class="flex flex-col overflow-x-hidden box-border relative">
    <div class="top border-b border-solid border-light-6 dark:border-gray-6">
      <div class="buttons flex">
        <button v-for="item in tabList" :key="item.value" class="grow flex justify-center items-center" :class="{ 'bg-light-7 dark:bg-gray-7': activeTab === item.value }" :title="item.label" @click="handleActive(item)">
          <div class="inline-block" :class="item.icon" /><span>{{ item.label }}</span>
        </button>
      </div>
    </div>
    <div class="h-full shrink-0">
      <PropForm v-if="activeTab === 'edit'" />
      <DataList v-if="activeTab === 'data'" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.top .buttons button {
  padding: 10px 15px;
  font-weight: normal;
  height: 40px;
  border: 0;
  vertical-align: top;
}
.buttons{
  height: 40px;
}
</style>
