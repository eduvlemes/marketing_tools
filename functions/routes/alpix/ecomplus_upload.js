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
    
        
  }).catch(err => {
    console.error(err)
    res.send(err.message)
  })  
};
