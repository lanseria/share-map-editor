import type { Ref } from 'vue'
import { PointTypeEnum } from './constant'

export const collapsed = useStorage('share-map-collapsed', false)
export const isEdit = useStorage('share-map-isEdit', false)
export const activeTab = useStorage('share-map-activeTab', 'edit')
export const mapCenter = useStorage('share-map-center', [122.11837, 30.02002])

export const currentProperties = ref(null) as Ref<any>

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

export const handleSetPoint = (type: PointTypeEnum = PointTypeEnum.点) => {
  const name = PointTypeEnumMap[type]
  // 设置完立即显示其当前要素属性
  activeTab.value = 'edit'

  currentProperties.value = {
    // 加载对应的Icon
    'icon-image': `${name}Icon`,
    'icon-size': 0.3,
    'type': type,
  }
  window.draw.changeMode('draw_point')
}
