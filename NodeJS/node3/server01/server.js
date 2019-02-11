var http = require("http");
var test = require("./node_modules/skrzypczak-robert-3ic1-test1/index.js")
var server = http.createServer(function (req, res) {
})

server.listen(3000);
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")