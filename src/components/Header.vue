<script lang="ts" setup>
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
        <div class="hidden md:flex pl-3 border-l border-solid h-full items-center">
          <ASpace>
            <a-button v-if="isEdit" type="text" @click="handleMapExitEdit">
              退出编辑
            </a-button>
            <a-button v-else type="text" @click="handleMapEdit">
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
