console.log("----Buffer Start ----")
const buffer = require("buffer").Buffer;
let myBuffer = buffer.from("My Nodejs")
console.log(myBuffer.toString("utf8").slice(1,5));
// TODO

console.log("----Buffer End ----")

