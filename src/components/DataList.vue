<script lang="ts" setup>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '要素类型',
    dataIndex: 'propType',
  },
  {
    title: '形状',
    dataIndex: 'type',
  },
]
const data = computed(() => {
  if (mapFeatures.value.length === 0)
    return []
  return mapFeatures.value.map((item) => {
    return {
      id: item.properties!.id,
      type: item.geometry.type,
      propType: item.properties!.type,
      center: item.properties!.center,
    }
  })
})

const handleRowClick = (record: any) => {
  const map = window.map
  setTimeout(() => {
    map.flyTo({
      center: record.center as any,
      zoom: 17,
    })
  })
}
</script>

<template>
  <div>
    <a-table :columns="columns" :data="data" @row-click="handleRowClick" />
  </div>
</template>
