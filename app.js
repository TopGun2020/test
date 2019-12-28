const express = require('express')
const app = express()
const port = 5000

app.use(express.json())
app.use(express.static(__dirname+'/index.html'))
app.listen(port, function (req, res) {
    console.log(`App is running on ${port}`)
})
app.get("/", (req, res) => {
    res.sendFile(__dirname+'/index.html')
})
app.get("/welcome", (req, res) => {
    res.send('hello')
})
app.get("/jsonContent", (req, res) => {
    var arr = {
        user: "Mr.AAAA",
        Num: 222,
        arr: [{
            name: "AA",
            last: "bb"
        },
        {
            name2: "BB",
            last: 'cc'
        }]
    }
    res.json(arr)
})

app.get("/htmlContent", (req, res) => {
    res.sendFile("./view/index.html", { root: __dirname })
})

app.get('/ex4/:user', (req, res) => {
    res.send(req.params.user)
})

app.get('/ex4_2/:user/:fname/:lname', (req, res) => {
    res.send(`username is ${req.params.user} first name is ${req.params.fname} lastname is  ${req.params.lname}`)
})

app.post('/ex5', (req, res) => {
    res.send(req.body.userId)
})


app.post('/cal', (req, res) => {
    const op1 = req.body.operandA
    const op2 = req.body.operandB
    const op = req.body.operator
    if(op == '+' || op == '-' || op == '*' || op == '/'){
        const x = eval(op1+op+op2)
        res.send(`${op1} ${op} ${op2} = ${x}`)
    }
    else{
        res.status(500).end()
    }
})

function cal(op1,op2,op) {

}

app.post('/smartCalculator', (req, res) => {
    var aa = []
    req.body.forEach(element => {
        var op1 = element.operandA
        var op2 = element.operandB
        var op = element.operator
        var x = eval(op1+op+op2)

        var y = `${op1} ${op} ${op2}`

        if(op == '+' || op == '-' || op == '*' || op == '/'){
            var j=JSON.parse(`{"${y}" : ${x}}`)
            aa.push(j)
           // res.send(`${op1} ${op} ${op2} = ${x}`)
        }
        else{
            aa.push({y: "error"})
        }
    });
    res.json(aa)
})

const crudDiabetics = require('./model/crudDiabetic')
const DiabeticModel = require('./model/diabetic')

app.get('/diabetic',(req,res)=>{
    crudDiabetics.doInsert(req.body)
    res.sendStatus(201).end()
})

app.post('/diabetic/:userid/:name',(req,res)=>{
    const coud = {ID:req.params.userid}
    const chance ={name:req.params.name}
    crudDiabetics.doUpdate(coud,chance)
    .then((data)=>{
        res.json(data).end()
    })
    .catch((err)=>{
        res.sendStatus(500).end()
    })
})

app.put('/diabetic',(req,res)=>{
    const coud = {ID:req.body.ID}
    const chance = req.body
    crudDiabetics.doUpdate(coud,chance)
    .then((data)=>{
        res.json(data).end()
    })
    .catch((err)=>{
        res.sendStatus(500).end()
    })
})

app.post('/deleteDiabetic/:userid',(req,res)=>{
    const coud = {ID:req.params.userid}
    crudDiabetics.doDelete(coud)
    .then((data)=>{
        res.json(data).end()
    })
    .catch((err)=>{
        res.sendStatus(500).end()
    })
})