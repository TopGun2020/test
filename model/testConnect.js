const express = require('express')
const app = express()
const DBCONNECT = require('./DBConnect')
const Schema = DBCONNECT.Schema
const test = new Schema({
    name:{
        type: String
    },
    camelCapp:{
        type: Number
    }
},{ versionkey: false, timestamps: true})

const TestCollecton = DBCONNECT.model('fakeCollecton',test)
const data = new TestCollecton({
    name:"toey",
    camelCapp: 123
})
data.save()
.then((result)=>{
    console.log(result)
})
.catch((error)=>{
    console.log(error)
    throw error
})