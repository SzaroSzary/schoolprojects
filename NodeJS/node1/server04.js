﻿var http = require("http");
var server = http.createServer(function (req, res) {
    console.log("adres żądania: " + req.url)
    res.writeHead(200, { "content-type": "text/plain;charset=utf-8" })
    res.end("<marquee>startujemy na 4000</marquee>")
})

server.listen(4000);
console.log("serwer startuje na porcie 4000 - ten komunikat zobaczysz tylko raz")