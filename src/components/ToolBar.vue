<script lang="ts" setup></script>

<template>
  <div class="flex">
    <ASpace>
      <a-button @click="handleSetPoint()">
        <template #icon>
          <icon-location />
        </template>
        点
      </a-button>

      <a-button @click="handleSetLineString()">
        <template #icon>
          <icon-share-alt />
        </template>
        线
      </a-button>

      <a-button @click="handleSetPolygon()">
        <template #icon>
          <icon-relation />
        </template>
        面
      </a-button>
    </ASpace>
  </div>
</template>
