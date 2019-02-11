var http = require("http");
var CD = require("./index.js")
var cd = new CD()
cd.author = "Metallica"
cd.title = "Load"
cd.rate = 6
console.log(cd)
console.log(cd.getCD())
var server = http.createServer(function (req, res) {
})
server.listen(3000);
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")