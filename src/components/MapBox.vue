<script setup lang="ts">
import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'

// import MapboxLanguage from '@mapbox/mapbox-gl-language'
// import { mapStyle } from '~/constant/map'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { collapsed, mapCenter } from '~/composables/store'
// import { mapLoad } from '~/composables/mapLoad'

// const keys = useMagicKeys()

mapboxgl.accessToken
  = 'pk.eyJ1IjoibGFuc2VyaWEiLCJhIjoiY2wxMGo5ZWk3MTF3dTNkcnRwcDMyMXowOSJ9.kxLDvTThtaU0uiBOXanNvA'

let map: mapboxgl.Map | null = null
const mapContainer = shallowRef()

const drawing = false

const updateMap = () => {
  //
}

onMounted(() => {
  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: mapStyle,
    // style: 'mapbox://styles/mapbox/outdoors-v12',
    center: mapCenter.value as LngLatLike,
    zoom: 15,
    preserveDrawingBuffer: true,
    hash: true,
  })
  map.scrollZoom.setWheelZoomRate(1)
  // map.addControl(new MapboxLanguage({ defaultLanguage: 'zh-Hans' }))
  window.map = map

  map.addControl(new mapboxgl.NavigationControl())

  map.on('load', () => {
    map!.resize()
    // mapLoad()
    updateMap()
  })
})
const handleCollapsed = () => {
  if (drawing)
    console.warn('drawing')

  collapsed.value = !collapsed.value
  setTimeout(() => {
    window.map.resize()
  }, 300)
}
</script>

<template>
  <div
    ref="mapContainer"
    class="h-full w-full top-0 bottom-0 left-0 right-0 relative"
  >
    <div class="sidebar-handle absolute right-0 bottom-9 px-4 py-1 bg-dark cursor-pointer hidden md:block z-10" @click="handleCollapsed()">
      <div v-if="collapsed" class="i-carbon:caret-right" />
      <div v-else class="i-carbon:caret-left" />
    </div>
  </div>
</template>
