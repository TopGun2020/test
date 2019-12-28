const DBCONNECT=require('mongoose')
const URL='mongodb://10.64.194.26:27017/ElderMonitoring'
const OPTS={
    user:'appuser',
    pass:'123456',
    useNewUrlParser:true,
    useUnifiedTopology:true
}
DBCONNECT.connect(URL,OPTS,(err)=>{
    if(err){
        console.log('cannot connect to mongoDB')
        throw err
    }
    console.log('connect to database')
})
module.exports=DBCONNECT 