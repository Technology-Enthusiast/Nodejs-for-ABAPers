let poHeader = { ebeln: 1, werks: "DE01", bukrs: 1000 };
let poItem = { ebeln: 1, ebelp: "00010", matnr: "MAT1" };

let http = require('http');
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
app.get('/', function (req, res) {
    res.send('Hello World')
})
app.get('/ekko', function (req, res) {
    res.write(JSON.stringify(poHeader));
    res.end();
})
app.post('/ekko',jsonParser, function (req, res) {
    console.log(req.body);
    res.write("We have receive the data");
    res.end();
})
app.get('/ekpo', function (req, res) {
    res.write(JSON.stringify(poItem));
    res.end();
})
app.listen(4040)
// http.createServer(function (request, response) {
//     if (request.method == "GET") {
//         response.setHeader('Content-type', "json")
//         switch (request.url) {
//             case '/ekko':
//                 response.write(JSON.stringify(poHeader));
//                 response.end();
//                 break;
//             case '/ekpo':
//                 response.write(JSON.stringify(poItem));
//                 response.end();
//                 break;
//             default:
//                 break;
//         }


//     }
// }).listen(4040);