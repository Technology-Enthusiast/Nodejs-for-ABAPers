let myPO = { ebeln:1,werks:"DE01",bukrs:1000};
console.log("mypo hello abc");
let http = require('http');
http.createServer(function(request,response){
     response.setHeader('Content-type',"json")

    response.write(JSON.stringify(myPO));
    response.end();
}).listen(4040);