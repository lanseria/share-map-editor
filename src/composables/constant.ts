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

export const DataList = [
  {
    id: 'hvd_80045',
    name: '长城郡',
    type: 'Changcheng Jun',
    time: '766-1096',
    position: '[103.03332, 25.34134]',
  },
  {
    id: 'hvd_87484',
    name: '富昌郡',
    type: 'Fuchang Jun',
    time: '2-14',
    position: '[114.93336, 36.83619]',
  },
  {
    id: 'hvd_99278',
    name: '涪川县',
    type: 'Fuchuan Xian',
    time: '585-906',
    position: '[108.24183, 27.94015]',
  },
  {
    id: 'hvd_163013',
    name: '（洽甘）井',
    type: '（Qiagan）Jing',
    time: '1911-1911',
    position: '[108.03337, 30.35384]',
  },
]

export const CleanDataList = DataList.map((item) => {
  return {
    id: item.id,
    name: item.name,
    type: item.type,
    time: item.time,
    year: item.time.split('-'),
    position: JSON.parse(item.position),
  }
})
