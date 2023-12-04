const getAppData = require('./../../lib/store-api/get-app-data')
exports.post = async ({ appSdk, admin }, req, res) => {
  const data = req.body
  const mail = data.mail
  const fullname = data.fullname || null
  const gender = data.gender || null
  getAppData({ appSdk, storeId }).then(appData => {
    if (mail) {
      const mailjet_ = require ('node-mailjet')
      .connect(appData.mailjet.primary_key, appData.mailjet.primary_secret)
      const request = mailjet_
        .post("contact", {'version': 'v3'})
        .request({
            "IsExcludedFromCampaigns":"false",
            "Name": fullname || "",
            "Email": mail
          })
      request
        .then((result) => {
          console.log(result.body)
          res.send({error: false, msg : result.body})
        })
        .catch((err) => {
          console.log(err.statusCode)
          res.send({error: true, msg : err})
        })
    }   
  })
  .catch(err => {
    console.error(err)
    res.send(err.message)
  })
  console.log('Nenhuma operação realizada')  
  res.send({error: true, msg : 'empty'})
}
