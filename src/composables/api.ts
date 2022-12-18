import axios from 'axios'

// https://8000.vip.cpolar.top/api/
// http://127.0.0.1:8080/
const prefix = 'https://8000.vip.cpolar.top/api'
// const prefix = 'http://127.0.0.1:8080'
export const queryMapFeatures = (data: any) => {
  return axios.request({
    url: `${prefix}/map/featuresbounds`,
    method: 'POST',
    data,
  })
}

export const createMapFeature = (data: any) => {
  return axios.request({
    url: `${prefix}/map/features`,
    method: 'POST',
    data,
  })
}

export const updateMapFeature = (data: any) => {
  return axios.request({
    url: `${prefix}/map/features`,
    method: 'PUT',
    data,
  })
}

export const deleteMapFeature = (id: string) => {
  return axios.request({
    url: `${prefix}/map/features/${id}`,
    method: 'DELETE',
  })
}
