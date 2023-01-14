<script lang="ts" setup>
import { mapStyle } from '~/composables'
</script>

<template>
  <div class="flex items-center">
    <div>图层：</div>
    <a-radio-group v-model="mapStyle">
      <a-radio v-for="item in LayerStyleList" :key="item.value" :value="item.value">
        {{ item.name }}
      </a-radio>
    </a-radio-group>
  </div>
</template>
