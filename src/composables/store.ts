import type { Feature, LineString, Point, Polygon } from '@turf/turf'
import type { Ref } from 'vue'
import { flatten, inRange } from 'lodash-es'
import * as turf from '@turf/turf'
import { nanoid } from 'nanoid'
import { CleanDataList, INIt_POINT, LineStringTypeEnum, PointTypeEnum, PolygonTypeEnum } from './constant'
import { reloadCityLayer } from './mapLayer'
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

export const mapCityFeatures = useStorage('share-map-city-features', []) as Ref<CleanDataItem[]>

export const mapSearchForm = useStorage('share-map-search-form', {
  locationName: '',
  year: 382,
  filter: [] as string[],
  isAllYear: false,
})

export const dynastyType = computed(() => {
  const time = mapSearchForm.value.year
  if (time >= -221 && time <= -207)
    return '秦'

  if (time >= -206 && time <= 220)
    return '汉'

  if (time >= 221 && time <= 580)
    return '三国两晋南北朝'

  if (time >= 581 && time <= 617)
    return '隋'

  if (time >= 618 && time <= 959)
    return '唐'

  if (time >= 960 && time <= 1279)
    return '宋'

  if (time >= 1280 && time <= 1367)
    return '元'

  if (time >= 1368 && time <= 1643)
    return '明'

  if (time >= 1644 && time <= 1911)
    return '清'
})

export const locationType = computed(() => {
  const locationTypeMap = {
    秦: ['郡', '县', '其他'],
    汉: ['州', '郡/国', '县/侯国', '其他'],
    三国两晋南北朝: ['州', '郡', '县', '其他'],
    隋: ['州', '郡', '县', '其他'],
    唐: ['观察使/防御使/经略使/节度使', '州/郡/府', '县', '其他'],
    宋: ['路', '州/府/军/监', '县', '其他'],
    元: ['行省/岭北中书省', '路/府', '州', '县', '其他'],
    明: ['布政使司/行省', '府', '州', '县', '其他'],
    清: ['省', '道', '府', '州', '县', '其他'],
  }
  return locationTypeMap[dynastyType.value as keyof typeof locationTypeMap]
})

export const filterCityList = computed(() => {
  const processDataList = mapCityFeatures.value.length === 0 ? CleanDataList : mapCityFeatures.value
  if (mapSearchForm.value.isAllYear)
    return processDataList

  return processDataList
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
})

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

watchDebounced(() => filterCityList.value, () => {
  console.warn('filterCityList changed')
  reloadCityLayer()
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
