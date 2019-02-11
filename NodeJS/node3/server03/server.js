var http = require("http");
var Browser = require("./index.js")
var server = http.createServer(function (req, res) {
    var b = new Browser(req, res)
    console.log(b)
})
server.listen(3000);
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")