import * as CryptoJS from 'crypto-js'
/**
 * 加密
 * @param paramData 未加密数据
 * @returns 加密数据
 */
export const encodeStr = (paramData: any) => {
  const w = CryptoJS.enc.Utf8.parse(WordArray)
  const O = CryptoJS.enc.Hex.parse(IV)
  let body
    = typeof paramData == 'string' ? paramData : JSON.stringify(paramData)
  body = CryptoJS.DES.encrypt(CryptoJS.enc.Utf8.parse(body), w, {
    iv: O,
  }).toString()
  return body
}
/**
 * 解密
 * @param data 加密数据
 * @returns 解密数据
 */
export const decodeStr = (data: string) => {
  const w = CryptoJS.enc.Utf8.parse(WordArray)
  const T = CryptoJS.enc.Hex.parse(IV)
  const i = data.replace(/\s+/g, '')
  const base64 = CryptoJS.enc.Base64.parse(i)
  const res = CryptoJS.DES.decrypt(
    {
      ciphertext: base64,
    } as any,
    w,
    {
      iv: T,
      padding: CryptoJS.pad.Pkcs7,
    },
  ).toString(CryptoJS.enc.Utf8)
  const resData = JSON.parse(res)
  return resData
}

export interface OriginDataItem {
  id: string
  name: string
  position: string
  time: string
  type: string
}

export interface CleanDataItem {
  id: string
  name: string
  type: string
  time: string
  year: [number, number]
  position: [number, number]
}

export const cleanCity = (items: OriginDataItem[]): CleanDataItem[] => {
  return items.map((item) => {
    const p = JSON.parse(item.position)
    const y = item.time.split('-').map(m => +m)
    if (y.length === 1) {
      console.error(item)
      throw new Error('time 只有一个')
    }

    if (+y[0] > +y[1]) {
      console.error(item)
      // throw new Error('time 大小错误')
      const temp = y[1]
      y[1] = y[0]
      y[0] = temp
    }
    if (y.length === 3) {
      y[0] = -y[1]
      y[1] = y[2]
    }

    return {
      id: item.id,
      name: item.name,
      type: item.type,
      time: item.time,
      year: [+y[0], +y[1]],
      position: [+p[0], +p[1]],
    }
  })
}
