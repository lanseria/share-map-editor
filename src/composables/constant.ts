export const MAP_SOURCE = 'MapSource'
export const MAP_LAYER_POLYGON = 'MapLayerPolygon'
export const MAP_LAYER_POLYGON_FILL = `${MAP_LAYER_POLYGON}Fill`
export const MAP_LAYER_POLYGON_OUTLINE = `${MAP_LAYER_POLYGON}Outline`
export const MAP_LAYER_STRINGLINE = 'MapLayerStringLine'
export const MAP_LAYER_POINT = 'MapLayerPoint'

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
