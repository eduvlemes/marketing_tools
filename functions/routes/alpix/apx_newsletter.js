

exports.post = ({ appSdk, admin }, req, res) => {
    const db = admin.firestore()
    const storeId = req.storeId || 1208
    
    if(!db.collection('stores').get(storeId)){
        db.collection('stores').add({
            [storeId] : {}
        })
    }

    const apx_db = db.collection('stores').get(storeId);
    
    const mail = req.mail;
    const fullname = req.fullname || null;
    const gender = req.gender || null;

    if(mail != null){
        add_mail(fullname, mail, gender)
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
        };
    }

    function delete_mail(mail){
        if(apx_db.orderByChild(email).equalTo(mail)){
            apx_db.orderByChild(email).equalTo(mail).remove();
        }
    }
    
    res.send({storeid : storeId})
}
