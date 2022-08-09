import OSS from 'ali-oss'
import { getSts } from '../api'
import { REGION, BUCKET } from '../constants'

export const getOSSClient = async () => {
  const res = await getSts()
  console.log(res)
  const { AccessKeyId, AccessKeySecret, SecurityToken } = res.Credentials
  return new OSS({
    // bucket 所在区域
    region: REGION,
    accessKeyId: AccessKeyId,
    accessKeySecret: AccessKeySecret,
    stsToken: SecurityToken,
    bucket: BUCKET,
    // 刷新token
    refreshSTSToken: async () => {
      const res = await getSts()
      const { AccessKeyId, AccessKeySecret, SecurityToken } = res.Credentials
      return {
        accessKeyId: AccessKeyId,
        accessKeySecret: AccessKeySecret,
        stsToken: SecurityToken
      }
    },
    refreshSTSTokenInterval: 5000 //
  })
}
