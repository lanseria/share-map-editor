<script lang="ts" setup>
const MIN_YEAR = -221
const MAX_YEAR = 1911

const marks = {
  '-221': '-221Y',
  '0': '0Y',
  '500': '500Y',
  '1000': '1000Y',
  '1500': '1500Y',
  '1911': '1911Y',
}
const formatter = (value: number) => {
  return `${value}年`
}
const handleSubmit = () => {
  //
}
</script>

<template>
  <a-form :model="mapSearchForm" class="w-500h" @submit="handleSubmit">
    <a-form-item field="locationName" tooltip="请输入地名" label="地名">
      <a-input
        v-model="mapSearchForm.locationName"
        placeholder="请输入地名"
      />
    </a-form-item>

    <a-form-item field="year" tooltip="请选择年份" label="年份">
      <div class="flex flex-col w-full">
        <a-input-number v-model="mapSearchForm.year" placeholder="请输入年份" mode="button" :min="MIN_YEAR" :max="MAX_YEAR" />
        <a-slider v-model="mapSearchForm.year" class="w-full" :min="MIN_YEAR" :max="MAX_YEAR" :marks="marks" :format-tooltip="formatter" />
      </div>
    </a-form-item>

    <AFormItem field="filter" tooltip="请筛选地点" label="筛选">
      <a-checkbox-group v-model="mapSearchForm.filter">
        <a-checkbox v-for="item in locationType" :key="item" :value="item">
          <template #checkbox="{ checked }">
            <a-tag :checked="checked" color="blue" checkable>
              隐藏{{ item }}
            </a-tag>
          </template>
        </a-checkbox>
      </a-checkbox-group>
    </AFormItem>
  </a-form>
</template>
