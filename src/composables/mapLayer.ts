import * as turf from '@turf/turf'
import mapboxgl from 'mapbox-gl'
import { MAP_CITY_LAYER_POINT, MAP_CITY_SOURCE } from './constant'
const popup = new mapboxgl.Popup({
  anchor: 'bottom-left',
  closeButton: false,
  closeOnClick: true,
  className: 'LayerPopup',
})
const handleFeatureHover = (e: any) => {
  const map = window.map
  const description = e.features[0].properties.description
  const coordinates = e.features[0].geometry.coordinates.slice()
  popup.setLngLat(coordinates).setHTML(description).addTo(map)
}

const handleFeatureHoverLeave = (_e: any) => {
  const map = window.map
  map.getCanvas().style.cursor = ''
  popup.remove()
}

const handleFeatureClick = (e: any) => {
  if (!isEdit.value) {
    handleFeatureHover(e)
    return
  }
  // prevent this popup from opening when the original click was on a marker
  const el = e.originalEvent.target
  // console.log(e)
  const [feature] = e.features
  // console.warn(feature)
  const draw = window.draw
  const mode = draw.getMode()
  if (mode === 'draw_line_string' || mode === 'draw_polygon' || mode === 'draw_point')
    return
  if (el.nodeName !== 'CANVAS')
    return
  // 设置完立即显示其当前要素属性
  activeTab.value = 'edit'
  currentProperties.value = {
    ...feature.properties,
  }
  collapsed.value = true
}

export const addSource = () => {
  const map = window.map
  const source: any = map.getSource(MAP_SOURCE)
  if (source) {
    source.setData(
      turf.featureCollection(mapFeatures.value),
    )
  }
  else {
    map.addSource(MAP_SOURCE, {
      type: 'geojson',
      data: turf.featureCollection(mapFeatures.value),
    })
  }
}

export const drawPolygon = () => {
  const map = window.map
  const source: any = map.getSource(MAP_SOURCE)
  if (!source)
    return
  if (map.getLayer(MAP_LAYER_POLYGON_FILL))
    map.removeLayer(MAP_LAYER_POLYGON_FILL)
  if (map.getLayer(MAP_LAYER_POLYGON_OUTLINE))
    map.removeLayer(MAP_LAYER_POLYGON_OUTLINE)

  map.addLayer({
    id: MAP_LAYER_POLYGON_FILL,
    type: 'fill',
    source: MAP_SOURCE, // reference the data source
    layout: {},
    paint: {
      'fill-color': ['coalesce', ['get', 'fill-color'], '#000'],
      'fill-opacity': ['coalesce', ['get', 'fill-opacity'], 0.3],
    },
    filter: ['==', ['geometry-type'], 'Polygon'],
  })
  // Add a black outline around the polygon.
  map.addLayer({
    id: MAP_LAYER_POLYGON_OUTLINE,
    type: 'line',
    source: MAP_SOURCE,
    layout: {},
    paint: {
      'line-color': ['coalesce', ['get', 'line-color'], '#000'],
      'line-width': ['coalesce', ['get', 'line-width'], 2],
      'line-opacity': ['coalesce', ['get', 'line-opacity'], 1],
    },
    filter: ['==', ['geometry-type'], 'Polygon'],
  })

  map.on('click', MAP_LAYER_POLYGON_FILL, handleFeatureClick)
  map.on('click', MAP_LAYER_POLYGON_OUTLINE, handleFeatureClick)
}
export const drawLine = () => {
  const map = window.map
  const source: any = map.getSource(MAP_SOURCE)
  if (!source)
    return
  if (map.getLayer(MAP_LAYER_STRINGLINE))
    map.removeLayer(MAP_LAYER_STRINGLINE)

  map.addLayer({
    id: MAP_LAYER_STRINGLINE,
    type: 'line',
    source: MAP_SOURCE,
    layout: {
      'line-cap': ['coalesce', ['get', 'line-cap'], 'round'],
      'line-join': ['coalesce', ['get', 'line-cap'], 'round'],
    },
    paint: {
      'line-color': ['coalesce', ['get', 'line-color'], '#000'],
      'line-width': ['coalesce', ['get', 'line-width'], 2],
      'line-opacity': ['coalesce', ['get', 'line-opacity'], 1],
    },
    filter: ['==', ['geometry-type'], 'LineString'],
  })

  map.on('click', MAP_LAYER_STRINGLINE, handleFeatureClick)
}
export const drawPoint = () => {
  const map = window.map
  const source: any = map.getSource(MAP_SOURCE)
  if (!source)
    return
  if (map.getLayer(MAP_LAYER_POINT))
    map.removeLayer(MAP_LAYER_POINT)
  map.addLayer({
    id: MAP_LAYER_POINT,
    type: 'symbol',
    source: MAP_SOURCE,
    layout: {
      'icon-image': ['get', 'icon-image'],
      'icon-size': ['coalesce', ['get', 'icon-size'], 1],
    },
    filter: ['==', ['geometry-type'], 'Point'],
  })

  map.on('click', MAP_LAYER_POINT, handleFeatureClick)
  map.on('touchend', MAP_LAYER_POINT, handleFeatureClick)
  map.on('mouseenter', MAP_LAYER_POINT, handleFeatureHover)
  map.on('mouseleave', MAP_LAYER_POINT, handleFeatureHoverLeave)
}

export const reloadSourceLayer = () => {
  addSource()
  drawPolygon()
  drawLine()
  drawPoint()
}

export const addCitySource = () => {
  const map = window.map
  const source: any = map.getSource(MAP_CITY_SOURCE)
  const cityMapFeatures = filterCityList.value.map((item) => {
    return turf.point(item.position, {
      name: item.name,
    })
  })
  if (source) {
    source.setData(
      turf.featureCollection(cityMapFeatures),
    )
  }
  else {
    map.addSource(MAP_CITY_SOURCE, {
      type: 'geojson',
      data: turf.featureCollection(cityMapFeatures),
    })
  }
}

export const drawCityPoint = () => {
  const map = window.map
  const source: any = map.getSource(MAP_CITY_SOURCE)
  if (!source)
    return
  if (map.getLayer(MAP_CITY_LAYER_POINT))
    map.removeLayer(MAP_CITY_LAYER_POINT)
  map.addLayer({
    id: MAP_CITY_LAYER_POINT,
    type: 'symbol',
    source: MAP_CITY_SOURCE,
    layout: {
      'text-field': ['get', 'name'],
      'icon-size': 0.25,
      'icon-image': '#F3AE1A',
      'text-size': 12,
      'text-offset': [0, 0.5],
      'text-anchor': 'top',
      'icon-allow-overlap': true,
    },
    paint: {
      'text-color': isDark.value ? '#bbb' : '#7e6c56',
      'text-halo-color': isDark.value ? '#000' : '#fff',
      'text-halo-width': 1,
      'text-halo-blur': 0,
    },
    filter: ['==', ['geometry-type'], 'Point'],
  })
}

export const reloadCityLayer = () => {
  addCitySource()
  drawCityPoint()
}
