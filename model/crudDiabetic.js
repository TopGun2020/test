const DiabeticModel = require("./diabetic")

let insert = (data)=>{
    console.log(data)
    const obj = new DiabeticModel(data)
    obj.save()
    .then((res)=>{
        console.log("success")
    })
    .catch((error)=>{
        console.log(error)
    })
}

let search = async(cond)=>{
    console.log(cond)
    const data = await DiabeticModel.findOne(cond,(err,res)=>{
        if(err){
            console.log('Cannot retrive data')
            console.log(err)
            throw err
        }
    })
    return data
}

let update = async(id,chance)=>{
    const a = {$push:{"timestamps":chance.timestamps}}
    const data = await DiabeticModel.updateOne(id,a,(err,res)=>{
        if(err){
            console.log('Cannot retrive data')
            throw err
        }
    })
    return data
}

let detete = async(id)=>{
    console.log(id)
    const data = await DiabeticModel.deleteOne(id,(err,res)=>{
        if(err){
            console.log('Cannot retrive data')
            throw err
        }
    })
    return data
}
var crud={
    doInsert: insert,
    doSearch: search,
    doUpdate: update,
    doDelete: detete
}

module.exports = crud