var http = require("http");
var Lang = require("./index.js")
var server = http.createServer(function (req, res) {
    var lang = new Lang(req, res);
    lang.setOptions(lang.language(), "index.html");
})
server.listen(3000);
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")