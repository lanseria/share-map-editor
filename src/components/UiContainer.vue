<script lang="ts" setup>
import { collapsed } from '~/composables/store'
</script>

<template>
  <div class="ui-container grow flex-shrink-0 flex flex-row w-full relative overflow-x-hidden">
    <MapBox class="grow shrink-0 top-0 bottom-0 left-0 basis-0 transition-all duration-300" :class="{ 'basis-0': collapsed, 'basis-full': !collapsed }" />
    <Side class="right bottom-0 top-0 right-0 grow-0 shrink-0 w-2/5 max-w-md h-[calc(100vh-42px)]" />
  </div>
</template>

<style lang="css" scoped>
.right {
  transition: all 200ms;
  box-shadow: rgb(0 0 0 / 10%) -2px 0px 0px;
}
</style>
