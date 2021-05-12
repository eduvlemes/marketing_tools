exports.post = async ({ appSdk, admin }, req, res) => {
  const data = req.body
  const storeId = data.storeId || 1208
  const collectionRef = admin.firestore().collection(`${storeId}_subscribers`)

  const mail = data.mail
  const fullname = data.fullname || null
  const gender = data.gender || null

  if (mail) {
    const subscriber = {
      fullname,
      mail,
      gender
    }
    
    const querySnapshot = await collectionRef.where('mail', '==', mail).get()
    if (querySnapshot.empty) {
      collectionRef.add(subscriber)
      console.log('add ' + mail + ' in store ' + storeId)
      return res.send({error: false, msg : 'Seu e-mail foi adicionado em nossa lista.'})
    }
    
    console.log('E-mail já inscrito em nossa newsletter.')
    return res.send({error: true, msg : 'E-mail já inscrito em nossa newsletter.'})
  }
    
  console.log('Nenhuma operação realizada')
  res.send({error: false, msg : 'Nenhuma operação realizada'})
}
