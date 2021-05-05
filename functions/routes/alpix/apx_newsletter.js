exports.post = ({ appSdk }, req, res) => {
   const storeId = req.storeId || 1208
   const apx_db = firebase.database().ref(store_id);
    const apx_subscribers = apx_db.child('subscribers');
    
    function add_mail(fullname, mail, gender){        
        const subscriber = {
            fullname: fullname,
            mail: mail,
            gender: gender
        };

        if(!apx_subscribers.orderByChild(email).equalTo(mail)){
            apx_subscribers.push(subscriber, function(){
                console.log('new sub added');
            })
        };
    }

    function delete_mail(mail){
        if(apx_subscribers.orderByChild(email).equalTo(mail)){
            apx_subscribers.orderByChild(email).equalTo(mail).remove(subscriber, function(){
                console.log('sub removed');
            });
        }
    }
    
    res.send('ok')
}