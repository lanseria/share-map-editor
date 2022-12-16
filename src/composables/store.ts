import type { Feature, LineString, Point, Polygon } from '@turf/turf'
import type { Ref } from 'vue'
import * as turf from '@turf/turf'
import { nanoid } from 'nanoid'
import { LineStringTypeEnum, PointTypeEnum, PolygonTypeEnum } from './constant'

export const collapsed = useStorage('share-map-collapsed', false)
export const isEdit = useStorage('share-map-isEdit', false)
export const activeTab = useStorage('share-map-activeTab', 'edit')
export const mapCenter = useStorage('share-map-center', [122.11837, 30.02002])
export const mapStyle = useStorage('share-map-style', 'osm')
export const mapFeatures = useStorage('share-map-draw-features', []) as Ref<Feature<Polygon | Point | LineString>[]>

export const currentProperties = ref(null) as Ref<any>

export const handleCollapsed = () => {
  collapsed.value = !collapsed.value
}

watchDebounced(() => collapsed.value, () => {
  window.map.resize()
}, { debounce: 300, maxWait: 600 })

watchDebounced(() => mapStyle.value, () => {
  const styleValue = LayerStyleList.find(item => item.value === mapStyle.value)
  styleValue && window.map.setStyle(styleValue.style)
}, { debounce: 300, maxWait: 600 })

export const handleMapEdit = () => {
  isEdit.value = true
}

export const handleMapExitEdit = () => {
  isEdit.value = false
  collapsed.value = false
  setTimeout(() => {
    window.map.resize()
  }, 300)
}

export const handleSetPolygon = (type: PolygonTypeEnum = PolygonTypeEnum.面) => {
  // 设置完立即显示其当前要素属性
  activeTab.value = 'edit'
  currentProperties.value = {
    ...{
      'fill-color': '#e88b4d',
      'fill-opacity': 0.8,
      'line-color': '#e0be28',
      'line-width': 2,
      'line-opacity': 1,
    },
    type,
  }

  const draw = window.draw
  draw.changeMode('draw_polygon')
}

export const handleSetLineString = (type: LineStringTypeEnum = LineStringTypeEnum.线) => {
  // 设置完立即显示其当前要素属性
  activeTab.value = 'edit'
  currentProperties.value = {
    ...{
      'line-color': '#ee6b3b',
      'line-width': 6,
      'line-opacity': 1,
      'line-cap': 'round',
      'line-join': 'round',
    },
    type,
  }
  const draw = window.draw
  draw.changeMode('draw_line_string')
}

export const handleSetPoint = (type: PointTypeEnum = PointTypeEnum.点) => {
  const name = PointTypeEnumMap[type]
  // 设置完立即显示其当前要素属性
  activeTab.value = 'edit'

  currentProperties.value = {
    // 加载对应的Icon
    'icon-image': `${name}Icon`,
    'icon-size': 0.3,
    'type': type,
  }
  window.draw.changeMode('draw_point')
}

/**
 * push进入数据
 * @param polygon
 */
export const pushFeatures = (feature: Feature<Polygon | LineString | Point>) => {
  const centerPoint = turf.center(feature)
  currentProperties.value = {
    ...currentProperties.value,
    center: centerPoint.geometry.coordinates,
    id: nanoid(),
  }
  feature.properties = {
    ...currentProperties.value,
  }

  const map = window.map
  setTimeout(() => {
    if (feature.geometry.type === 'Point') {
      map.flyTo({
        center: currentProperties.value.center as any,
        zoom: 17,
      })
    }
    else {
      const bbox = turf.bbox(feature)
      map.fitBounds([[bbox[0], bbox[1]], [bbox[2], bbox[3]]], {
        padding: 200,
      })
    }
  })
  // TODO: filter type
  mapFeatures.value.push(feature)
  reloadSourceLayer()
}
