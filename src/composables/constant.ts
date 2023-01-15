import { cleanCity } from './utils'

export const MAP_SOURCE = 'MapSource'
export const MAP_LAYER_POLYGON = 'MapLayerPolygon'
export const MAP_LAYER_POLYGON_FILL = `${MAP_LAYER_POLYGON}Fill`
export const MAP_LAYER_POLYGON_OUTLINE = `${MAP_LAYER_POLYGON}Outline`
export const MAP_LAYER_STRINGLINE = 'MapLayerStringLine'
export const MAP_LAYER_POINT = 'MapLayerPoint'

export const MAP_CITY_SOURCE = 'MapCitySource'
export const MAP_CITY_LAYER_POINT = 'MapCityLayerPoint'

export const WordArray = 'LP6IRTBX'
export const IV = '0102030405060708'
export const INIt_POINT = [108.84, 31.06]
export const INIt_ZOOM = 3.5

export enum PointTypeEnum {
  点 = 'InitPoint',
}

export const PointTypeEnumMap = {
  [PointTypeEnum.点]: '点',
}

export enum LineStringTypeEnum {
  线 = 'InitLineString',
}

export const LineStringTypeEnumMap = {
  [LineStringTypeEnum.线]: '线',
}

export enum PolygonTypeEnum {
  面 = 'InitPolygon',
}

export const PolygonTypeEnumMap = {
  [PolygonTypeEnum.面]: '面',
}
// const MapBoxStylePrefix = 'mapbox://styles/mapbox/'
const MapBoxStylePrefix = 'mapbox://styles/xuezhuhun/'
// export const LayerStyleList = [
//   {
//     name: 'satellite streets',
//     value: 'satellite',
//     style: `${MapBoxStylePrefix}satellite-streets-v12`,
//   },
//   {
//     name: 'light',
//     value: 'light',
//     style: `${MapBoxStylePrefix}light-v11`,
//   },
//   {
//     name: 'dark',
//     value: 'dark',
//     style: `${MapBoxStylePrefix}dark-v11`,
//   },
//   {
//     name: 'streets',
//     value: 'streets',
//     style: `${MapBoxStylePrefix}streets-v12`,
//   },
//   {
//     name: 'outdoors',
//     value: 'outdoors',
//     style: `${MapBoxStylePrefix}outdoors-v12`,
//   },
// ]
export const LayerStyleList = [
  {
    name: '样式1',
    value: 'satellite',
    style: `${MapBoxStylePrefix}cl8figjhr000114pdi6ssaay9`,
  },
  {
    name: '样式2',
    value: 'light',
    style: `${MapBoxStylePrefix}cl8fifwmc001z14qilganef03`,
  },
  {
    name: '样式3',
    value: 'dark',
    style: `${MapBoxStylePrefix}cl7obude3001y15npbnat955g`,
  },
]

export const DataList = []

export const dynastyList = [
  {
    name: '秦',
    start: -221,
    end: -207,
    types: ['郡', '县', '其他'],
  },
  {
    name: '汉',
    start: -206,
    end: 220,
    types: ['州', '郡/国', '县/侯国', '其他'],
  },
  {
    name: '三国两晋南北朝',
    start: 221,
    end: 580,
    types: ['州', '郡', '县', '其他'],
  },
  {
    name: '隋',
    start: 581,
    end: 617,
    types: ['州', '郡', '县', '其他'],
  },
  {
    name: '唐',
    start: 618,
    end: 959,
    types: ['观察使/防御使/经略使/节度使', '州/郡/府', '县', '其他'],
  },
  {
    name: '宋',
    start: 960,
    end: 1279,
    types: ['路', '州/府/军/监', '县', '其他'],
  },
  {
    name: '元',
    start: 1280,
    end: 1367,
    types: ['行省/岭北中书省', '路/府', '州', '县', '其他'],
  },
  {
    name: '明',
    start: 1368,
    end: 1643,
    types: ['布政使司/行省', '府', '州', '县', '其他'],
  },
  {
    name: '清',
    start: 1644,
    end: 1911,
    types: ['省', '道', '府', '州', '县', '其他'],
  },
]

export const CleanDataList = cleanCity(DataList)
