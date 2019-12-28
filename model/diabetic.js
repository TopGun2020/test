const DBCONNECT = require('./DBConnect')
const Schema = DBCONNECT.Schema
const DiabeticSchema = new Schema({
    name:{
        type: String
    },
    ID:{
        type: Number
    },
    timestamps:[{
        a:{
            type:Number
        },
        b:{
            type:String
        }
    }]
},{ versionkey: false, timestamps: true})
const DiabeticModel = DBCONNECT.model('diabetics',DiabeticSchema)

module.exports = DiabeticModel