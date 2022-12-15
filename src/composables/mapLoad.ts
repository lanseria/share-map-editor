const loadImg = (name: string, url: string, sdf = false) => {
  const map = window.map
  map.loadImage(url, (error, image) => {
    if (error)
      throw error
    image && map.addImage(name, image, { sdf })
  })
}

export const mapLoad = () => {
  loadImg('点icon', '/img/点icon.png')

  setTimeout(() => {
    // reloadSource()
  }, 1000)
}
