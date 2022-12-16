<script setup lang="ts">
import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'

// import MapboxLanguage from '@mapbox/mapbox-gl-language'
// import { mapStyle } from '~/constant/map'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import DrawLineString from '~/draw/linestring'
import DrawRectangle from '~/draw/rectangle'

import drawStyles from '~/draw/styles'

// const keys = useMagicKeys()

mapboxgl.accessToken
  = 'pk.eyJ1IjoibGFuc2VyaWEiLCJhIjoiY2wxMGo5ZWk3MTF3dTNkcnRwcDMyMXowOSJ9.kxLDvTThtaU0uiBOXanNvA'

let map: mapboxgl.Map | null = null
const mapContainer = shallowRef()

const updateMap = () => {
  //
}

onMounted(() => {
  const styleValue = LayerStyleList.find(item => item.value === mapStyle.value)
  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: styleValue?.style,
    // style: 'mapbox://styles/mapbox/outdoors-v12',
    center: mapCenter.value as LngLatLike,
    zoom: 15,
    preserveDrawingBuffer: true,
    hash: true,
  })
  // map.scrollZoom.setWheelZoomRate(1)
  // map.scrollZoom.setZoomRate(1)
  // map.addControl(new MapboxLanguage({ defaultLanguage: 'zh-Hans' }))
  window.map = map

  const draw = new MapboxDraw({
    displayControlsDefault: false,
    userProperties: true,
    modes: {
      ...MapboxDraw.modes,
      draw_line_string: DrawLineString,
      draw_rectangle: DrawRectangle,
    },
    styles: drawStyles,
  })
  window.draw = draw

  map.addControl(new mapboxgl.NavigationControl())
  map.addControl(draw, 'top-left')

  map.on('load', () => {
    map!.resize()
    mapLoad()
    updateMap()
  })
  map.on('draw.create', (e) => {
    pushFeatures(e.features[0])
    draw.deleteAll()
  })
})
</script>

<template>
  <div
    ref="mapContainer"
    class="h-full w-full top-0 bottom-0 left-0 right-0 relative"
  >
    <div v-show="isEdit" class="sidebar-handle absolute right-0 bottom-9 px-4 py-1 bg-light dark:bg-dark cursor-pointer hidden md:block z-10" @click="handleCollapsed()">
      <div v-if="collapsed" class="i-carbon:caret-right" />
      <div v-else class="i-carbon:caret-left" />
    </div>
    <div class="absolute left-0 top-0 bg-light dark:bg-dark flex items-center px-3 py-1 z-10">
      <div>图层：</div>
      <a-radio-group v-model="mapStyle">
        <a-radio v-for="item in LayerStyleList" :key="item.value" :value="item.value">
          {{ item.name }}
        </a-radio>
      </a-radio-group>
    </div>
  </div>
</template>
