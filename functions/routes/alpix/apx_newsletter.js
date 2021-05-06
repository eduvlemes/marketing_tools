exports.post = ({ appSdk, admin }, req, res) => {
    const db = admin.firestore()
    const data = req.body
    const storeId = data.storeId || 1208
    
    if(!db.collection('stores').get(storeId)){
        db.collection('stores').add({
            [storeId] : {}
        })
        console.log('Adicionou loja ' + storeId)
    }

    const apx_db = db.collection('stores').get(storeId);
    
    const mail = data.mail;
    const fullname = data.fullname || null;
    const gender = data.gender || null;

    if(mail != null){
        const subscriber = {
            fullname: fullname,
            mail: mail,
            gender: gender
        }

        const query = apx_db.where('mail', '==', mail).get();
        if(query.empty){
            apx_db.add(subscriber)
            console.log('add ' + mail + ' in store ' + storeId)
            res.send({error: 'false', msg : 'Seu e-mail foi adicionado em nossa lista.'})
        }
        console.log('E-mail já inscrito em nossa newsletter.')
        res.send({error: 'true', msg : 'E-mail já inscrito em nossa newsletter.'})
    }
    
    console.log('Nenhuma operação realizada')
    res.send({error: 'false', msg : 'Nenhuma operação realizada'})
}
