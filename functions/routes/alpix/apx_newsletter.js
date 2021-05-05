exports.post = ({ appSdk }, req, res) => {
    const storeId = req.storeId || 1208
    
    if(!firebase.database().hasChild(storeId)){
        firebase.database().push(
            {
                [storeId] : {}
            }
        )
    }

    const apx_db = firebase.database().ref(storeId);
    
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
            apx_db.push(subscriber, function(){
                console.log('new sub added');
            })
        };
    }

    function delete_mail(mail){
        if(apx_db.orderByChild(email).equalTo(mail)){
            apx_db.orderByChild(email).equalTo(mail).remove(subscriber, function(){
                console.log('sub removed');
            });
        }
    }
    
    res.send({storeid : storeId})
}
