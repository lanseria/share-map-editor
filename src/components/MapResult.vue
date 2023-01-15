<script lang="ts" setup>
import type { CleanDataItem } from '~/composables'
import { INIt_POINT, INIt_ZOOM, flattenTypes } from '~/composables'

const onClick = (item: CleanDataItem) => {
  const map = window.map
  console.warn(item)
  map.flyTo({
    center: [item.position[0], item.position[1] - 0.005],
    zoom: 10,
  })
}
const onBack = () => {
  const map = window.map
  map.flyTo({
    center: [INIt_POINT[0], INIt_POINT[1]],
    zoom: INIt_ZOOM,
  })
}
</script>

<template>
  <div>
    <a-typography-text type="secondary">
      搜索结果：{{ filterCityList.length }} 条 <a-button type="text" size="mini" @click="onBack">
        返回
      </a-button>
    </a-typography-text>
    <AList
      :virtual-list-props="{
        height: 300,
      }"
      :data="filterCityList"
    >
      <template #item="{ item, index }">
        <AListItem :key="index">
          <a-list-item-meta>
            <template #avatar>
              <a-avatar :style="{ backgroundColor: item.color }" :size="40" shape="square">
                {{ item.type }}
              </a-avatar>
            </template>
            <template #title>
              <div class="cursor-pointer" @click="onClick(item)">
                {{ item.name }}
                <a-tag v-if="!flattenTypes.some(k => item.name.endsWith(k))">
                  其他
                </a-tag>
              </div>
            </template>
            <template #description>
              begin {{ item.year[0] }} CE end {{ item.year[1] }} CE
            </template>
          </a-list-item-meta>
        </AListItem>
      </template>
    </AList>
    <!-- <div v-for="item in filterCityList" :key="item.id" class="px-6 py-2 bg-light-500 hover:bg-light-800 cursor-pointer flex items-center mb-1 rounded" @click="onClick(item)">
        <a-badge status="warning" class="mr-10px" />
        <div class="text-size-15px">
          {{ item.name }}
        </div>
        <ATag color="red">
          {{ item.time }}
        </ATag>
      </div> -->
  </div>
</template>
