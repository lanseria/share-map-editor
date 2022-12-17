export const MAP_SOURCE = 'MapSource'
export const MAP_LAYER_POLYGON = 'MapLayerPolygon'
export const MAP_LAYER_POLYGON_FILL = `${MAP_LAYER_POLYGON}Fill`
export const MAP_LAYER_POLYGON_OUTLINE = `${MAP_LAYER_POLYGON}Outline`
export const MAP_LAYER_STRINGLINE = 'MapLayerStringLine'
export const MAP_LAYER_POINT = 'MapLayerPoint'

export const WordArray = 'LP6IRTBX'
export const IV = '0102030405060708'

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
const MapBoxStylePrefix = 'mapbox://styles/mapbox/'
export const LayerStyleList = [
  {
    name: 'osm',
    value: 'osm',
    style: osmStyle,
  },
  {
    name: 'osm-local',
    value: 'osm-local',
    style: osmLocalStyle,
  },
  {
    name: 'satellite streets',
    value: 'satellite',
    style: `${MapBoxStylePrefix}satellite-streets-v12`,
  },
  {
    name: 'light',
    value: 'light',
    style: `${MapBoxStylePrefix}light-v11`,
  },
  {
    name: 'dark',
    value: 'dark',
    style: `${MapBoxStylePrefix}dark-v11`,
  },
  {
    name: 'streets',
    value: 'streets',
    style: `${MapBoxStylePrefix}streets-v12`,
  },
  {
    name: 'outdoors',
    value: 'outdoors',
    style: `${MapBoxStylePrefix}outdoors-v12`,
  },
]
