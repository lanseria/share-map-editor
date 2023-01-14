<script lang="ts" setup>
import { operationShow } from '~/composables'
</script>

<template>
  <Transition>
    <div v-if="operationShow" class="absolute left-10px top-55px rounded bg-white dark:bg-dark px-3 py-1 z-10 lt-sm:max-w-300px">
      <MapLayer />
      <a-divider />
      <MapSearch />
      <a-divider />
      <MapResult />
    </div>
  </Transition>
  <div class="absolute left-10px top-10px z-100">
    <AButton @click="operationShow = !operationShow">
      <template #icon>
        <icon-eye v-if="!operationShow" />
        <icon-eye-invisible v-else />
      </template>
      {{ operationShow ? '隐藏' : '显示' }}
    </AButton>
  </div>
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
