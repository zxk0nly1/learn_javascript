var express = require('express');
var app = express();
const DAO = require('./dao')
const dao = new DAO('mongodb://localhost:27017/', 'test', 'user')

// app.get('/', function(req, res) {
//     res.send('Hello World !');
// })

app.get('/init', (req, res) => {
    if (req.query.age) { // 按照条件查询
        let age = { age: req.query.age }
        dao.query(age).then(result => {
            res.send({ result })
        })
    } else { //查询全部
        dao.query().then(result => {
            res.send({ result })
        })
    }
})

app.listen(3000, function() {
    console.log('Example app Listening on port 3000');
})