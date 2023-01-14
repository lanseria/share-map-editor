<script lang="ts" setup>
import { INIt_POINT, INIt_ZOOM } from '~/composables'

const onClick = (item: any) => {
  const map = window.map
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
    <div v-for="item in filterCityList" :key="item.name" class="px-10 py-3 hover:bg-light cursor-pointer" @click="onClick(item)">
      {{ item.name }} {{ item.time }}
    </div>
  </div>
</template>
