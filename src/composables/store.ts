import type { Feature, LineString, Point, Polygon } from '@turf/turf'
import type { Ref } from 'vue'
import { flatten, inRange } from 'lodash-es'
import * as turf from '@turf/turf'
import { nanoid } from 'nanoid'
import { CleanDataList, INIt_POINT, LineStringTypeEnum, PointTypeEnum, PolygonTypeEnum, dynastyList } from './constant'
// import { reloadCityLayer } from './mapLayer'
import type { CleanDataItem } from './utils'
// import { createMapFeature } from './api'

export type MyFeature = Feature<Polygon | Point | LineString>

export const collapsed = ref(false)
export const operationShow = ref(true)
export const fileShow = ref(false)
export const isEdit = useStorage('share-map-isEdit', false)
export const activeTab = useStorage('share-map-activeTab', 'edit')
export const mapCenter = ref(INIt_POINT)
export const mapStyle = useStorage('share-map-style', 'satellite')
export const mapFeatures = useStorage('share-map-draw-features', []) as Ref<MyFeature[]>

export const mapCityFeatures = ref([]) as Ref<CleanDataItem[]>

export const mapSearchForm = useStorage('share-map-search-form', {
  locationName: '',
  year: 382,
  filter: [] as string[],
  isAllYear: false,
})

export const dynastyTypeName = ref('未知')

export const locationTypeNames = ref<string[]>([])

export const filterCityList = ref<CleanDataItem[]>([])

const processDataFunc = () => {
  const processDataList = mapCityFeatures.value.length === 0 ? CleanDataList : mapCityFeatures.value
  if (mapSearchForm.value.isAllYear) {
    filterCityList.value = processDataList
  }
  else {
    filterCityList.value = processDataList
      .filter((item) => {
        return inRange(mapSearchForm.value.year, item.year[0], item.year[1])
      })
      .filter((item) => {
        const types = mapSearchForm.value.filter.map((it) => {
          return it.split('/')
        })
        const flattenTypes = flatten(types)
        return !flattenTypes.some(k => item.name.endsWith(k))
      })
      .filter((item) => {
        return item.name.match(mapSearchForm.value.locationName)
      })
  }
}

// 大数据延迟处理
watchEffect(
  () => {
    const time = mapSearchForm.value.year
    dynastyList.forEach((item) => {
      if (item.start <= time && item.end >= time) {
        dynastyTypeName.value = item.name
        locationTypeNames.value = item.types
      }
    })
  },
)

// 大数据延迟处理
watchDebounced([
  () => mapCityFeatures.value,
  () => mapSearchForm.value,
], () => {
  processDataFunc()
}, { debounce: 300, maxWait: 600, immediate: true })

export const currentProperties = ref(null) as Ref<any>

export const handleCollapsed = () => {
  collapsed.value = !collapsed.value
}

export const handleCollapsedFalse = () => {
  collapsed.value = false
}

watchDebounced(() => mapFeatures.value, () => {
  console.warn('mapFeatures changed')
  reloadSourceLayer()
}, { debounce: 300, maxWait: 600 })

watchDebounced(() => collapsed.value, () => {
  window.map.resize()
}, { debounce: 300, maxWait: 600 })

watchDebounced(() => mapStyle.value, () => {
  const styleValue = LayerStyleList.find(item => item.value === mapStyle.value)
  styleValue && window.map.setStyle(styleValue.style)
  setTimeout(() => {
    mapLoad()
    reloadSourceLayer()
  }, 100)
}, { debounce: 100, maxWait: 200 })

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
      'description': '',
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
      'description': '',
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
    'description': '',
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
        zoom: 4,
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
  // createMapFeature(feature)

  // reloadSourceLayer()
}
