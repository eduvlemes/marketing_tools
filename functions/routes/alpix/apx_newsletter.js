

exports.post = ({ appSdk }, req, res) => {
    const storeId = req.storeId || 1208
    
    if(!admin.database().hasChild(storeId)){
        admin.database().set(
            {
                [storeId] : []
            }
        )
    }

    const apx_db = admin.database().ref(storeId);
    
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

        if(!apx_db.orderByChild(email).equalTo(mail)){
            apx_db.set(subscriber)
        };
    }

    function delete_mail(mail){
        if(apx_db.orderByChild(email).equalTo(mail)){
            apx_db.orderByChild(email).equalTo(mail).remove();
        }
    }
    
    res.send({storeid : storeId})
}
