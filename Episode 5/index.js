let poHeader = { ebeln: 1, werks: "DE01", bukrs: 1000 };
let poItem = { ebeln: 1, ebelp: "00010", matnr: "MAT1" };
let events = require("events");
let fs = require("fs");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const result = dotenv.config();
let eventEmitter = new events();
eventEmitter.on('POData',(data)=>{
  console.log("Event Received "+data)
})
eventEmitter.on('POData',(data)=>{
  console.log(eventEmitter.listenerCount('POData'));
  console.log(eventEmitter.rawListeners('POData'));
  console.log("Event Received another receiver " + data)
})
app.get("/", function (req, res) {
  switch (req.query.data) {
    case "ekko":
      eventEmitter.emit('POData',req.query.data);
      fs.readFile("./ekko.json", function (err, data) {
        res.write(JSON.stringify(JSON.parse(data)));
        res.end();
      });

      break;
    case "ekpo":
      eventEmitter.emit('POData',req.query.data);
      fs.readFile("./ekpo.json", function (err, data) {
        res.write(JSON.stringify(JSON.parse(data)));
        res.end();
      });
      break;
    default:
      console.log("hello");
      break;
  }
});
// // app.get('/ekko', function (req, res) {
// //     res.write(JSON.stringify(poHeader));
// //     res.end();
// // })
// // app.get('/ekpo', function (req, res) {
// //     res.write(JSON.stringify(poItem));
// //     res.end();
// // })
app.post("/", jsonParser, function (req, res) {
//   console.log(req);
  switch (req.query.data) {
    case "ekko":
      fs.readFile("./ekko.json", function (err, data) {
        let readData = JSON.parse(data);
        readData.push(req.body);

        fs.writeFile(
          "./ekko.json",
          JSON.stringify(readData, ["ebeln", "werks"], 4),
          function (err, data) {}
        );
      });
      res.end();
      break;
    case "ekpo":
      fs.readFile("./NodeJS for ABAPer's/Episode 3/ekpo.json", function (
        err,
        data
      ) {
        res.write(JSON.stringify(data));
        res.end();
      });
      break;
    default:
      break;
  }
});

app.listen(process.env.PORT);
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
