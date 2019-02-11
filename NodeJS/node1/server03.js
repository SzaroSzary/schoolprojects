var http = require("http");
var server = http.createServer(function (req, res) {
    console.log("adres żądania: " + req.url)
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
    res.end("<marquee>startujemy na 3000</marquee>")
})

server.listen(3000);
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")