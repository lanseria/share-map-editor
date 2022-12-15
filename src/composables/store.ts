export const collapsed = useStorage('share-map-collapsed', false)
export const isEdit = useStorage('share-map-isEdit', false)
export const activeTab = useStorage('share-map-activeTab', 'edit')
export const mapCenter = useStorage('share-map-center', [122.11837, 30.02002])

export const handleCollapsed = () => {
  collapsed.value = !collapsed.value
  setTimeout(() => {
    window.map.resize()
  }, 300)
}

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
