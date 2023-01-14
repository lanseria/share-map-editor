import { reloadCityLayer } from './mapLayer'

function createColorPoint(...color: number[]) {
  const d = 48
  const r = d / 2
  const r2 = r ** 2
  const bytesPerPixel = 4

  const data = new Uint8Array(d * d * bytesPerPixel)

  for (let x = 0; x < d; x++) {
    for (let y = 0; y < d; y++) {
      if ((x - r) ** 2 + (y - r) ** 2 >= r2)
        continue

      const offset = (y * d + x) * bytesPerPixel
      for (let b = 0; b < bytesPerPixel; b++) data[offset + b] = color[b]
    }
  }
  return { width: d, height: d, data }
}

const loadImg = (name: string, url: string, sdf = false) => {
  const map = window.map
  if (map.hasImage(name))
    return

  map.loadImage(url, (error, image) => {
    if (error)
      throw error
    image && map.addImage(name, image, { sdf })
  })
}

export const mapLoad = () => {
  const map = window.map
  map.addImage('#F3AE1A', createColorPoint(255, 193, 7, 255))

  loadImg('点Icon', '/imgs/point-icon.png')

  setTimeout(() => {
    reloadSourceLayer()
    reloadCityLayer()
  }, 1000)
}
