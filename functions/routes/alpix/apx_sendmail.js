exports.post = async ({ appSdk, admin }, req, res) => {
  const form_data = req.body
  const storeId = form_data.storeId || 1208
  const collectionRef = admin.firestore().collection('contact_mail')

  const destination = form_data.destination
  const subject = form_data.subject || form_data.storeId + ' - Sem Assunto'
  const content = form_data.content 
  const replyToMail = form_data.reply_mail || '';
  
  if (destination != "" && subject != "" && content != "") {
      collectionRef.add({message: {html: content, subject: subject , text: content.replace('<br>',' - ')}, to: destination, replyTo: replyToMail })
      return res.send({error: false, msg : 'Sua mensagem foi enviada.'})
  }else{
    return res.send({error: true, msg : 'Preencha o formulário corretamente ou tente novamente mais tarde.'})
  }
}