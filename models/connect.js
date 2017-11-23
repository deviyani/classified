var mongo=require('mongoose');
mongo.connect('mongodb://localhost:27017/login',(err,response)=>{
    if(err){console.log("error in connecting to database");}
    else {
        console.log("successfully connected");
    }
});
module.exports={mongo};