exports.post = async ({ appSdk, admin }, req, res) => {
  const data = req.body
  const storeId = data.storeId || 1208
  const collectionRef = admin.firestore().collection('contact_mail')

  const destination = data.destination
  const subject = data.storeId + ' - ' + data.subject || data.storeId + ' - Sem Assunto'
  const content = data.content
  
  
  

  if (destination != "" && subject != "" && content != "") {
      collectionRef.add('message: {html:"'+ content +'",subject:"'+ subject +'",text:"'+ content +'"},to:"'+ destination +'"')
      return res.send({error: false, msg : 'Sua mensagem foi enviada.'})
  }else{
    return res.send({error: true, msg : 'Preencha o formulário corretamente ou tente novamente mais tarde.'})
  }

}