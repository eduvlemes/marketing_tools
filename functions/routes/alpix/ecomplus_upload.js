const getAppData = require('../../lib/store-api/get-app-data')
const ecomUtils = require('@ecomplus/utils')
const axios = require('axios')
const FormData = require('form-data')

exports.post = async ({ appSdk, admin }, req, res) => {
  const storeId = data.storeId
  const data = req.body
  const mail = data.mail
  const fullname = data.fullname || null
  const gender = data.gender || null
  console.log(data)
  getAppData({ appSdk, storeId }).then(appData => {
    //const tryImageUpload = (storeId, auth, originImgUrl, product, index) => new Promise(resolve => {
      
        const form = new FormData()
        form.append('file', Buffer.from(data), originImgUrl.replace(/.*\/([^/]+)$/, '$1'))
  
        return axios.post(`https://apx-storage.e-com.plus/${storeId}/api/v1/upload.json`, form, {
          headers: {
            ...form.getHeaders(),
            'X-Store-ID': storeId,
            'X-My-ID': appData.uploader.x_my_id,
            'X-Access-Token': appData.uploader.x_access_token
          }
        }).then(({ data, status }) => {
            if (data.picture) {
              for (const imgSize in data.picture) {
                if (data.picture[imgSize]) {
                  if (!data.picture[imgSize].url) {
                    delete data.picture[imgSize]
                    continue
                  }
                  if (data.picture[imgSize].size !== undefined) {
                    delete data.picture[imgSize].size
                  }
                  data.picture[imgSize].alt = `${product.name} (${imgSize})`
                }
              }
              if (Object.keys(data.picture).length) {
                return resolve({
                  _id: ecomUtils.randomObjectId(),
                  ...data.picture
                })
              }
            }
            const err = new Error('Unexpected Storage API response')
            err.response = { data, status }
            throw err
        })
      }).catch(err => {
        console.error(err)
        res.send(err.message)         
      })   
  .catch(err => {
    console.error(err)
    res.send(err.message)
  })
  console.log('Nenhuma operação realizada')  
  res.send({error: true, msg : 'empty'})
}
