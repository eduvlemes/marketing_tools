

exports.post = ({ appSdk, admin }, req, res) => {
    const db = admin.firestore()
    const storeId = req.storeId || 1208
    
    if(!db.collection('stores').get(storeId)){
        db.collection('stores').add({
            [storeId] : {}
        })
        console.log('Adicionou loja')
    }

    const apx_db = db.collection('stores').get(storeId);
    
    const mail = req.mail;
    const fullname = req.fullname || null;
    const gender = req.gender || null;

    if(mail != null){
        add_mail(fullname, mail, gender)
        console.log('chamou função')
    }
    
    function add_mail(fullname, mail, gender){        
        const subscriber = {
            fullname: fullname,
            mail: mail,
            gender: gender
        };

        const query = apx_db.where('mail', '==', mail).get();
        if(query.empty){
            apx_db.add(subscriber)
            res.send({error: 'false', msg : 'Seu e-mail foi adicionado em nossa lista.'})
        };

        res.send({error: 'true', msg : 'E-mail já inscrito em nossa newsletter.'})
        
    }

    function delete_mail(mail){
        if(apx_db.orderByChild(email).equalTo(mail)){
            apx_db.orderByChild(email).equalTo(mail).remove();
        }
    }
    
    res.send({error: 'false', msg : ''})
}
