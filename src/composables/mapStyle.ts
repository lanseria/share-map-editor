export const mapStyle: mapboxgl.Style = {
  version: 8,
  name: 'Basic',
  glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
  sources: {
    'mapbox-streets': {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-streets-v8',
    },

    'osm': {
      tiles: [
        // 'https://openstreetmap.vip.cpolar.top/tile/{z}/{x}/{y}.png',
        'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
      ],
      type: 'raster',
      tileSize: 256,
      maxzoom: 20,
    },
  },
  layers: [
    // {
    //   id: 'background',
    //   type: 'background',
    //   paint: {
    //     'background-color': 'rgba(255,255,255,0.5)',
    //   },
    // },
    {
      id: 'osm',
      source: 'osm',
      type: 'raster',
    },
  ],
}
