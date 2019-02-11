var http = require("http");
var server = http.createServer(function (req, res) {
    console.log("adres żądania: " + req.url)
    console.log("nagłowki żądania" + req.rawHeaders)
    res.writeHead(200, { "content-type": "audio/mpeg;charset=utf-8" })
    res.end("<marquee>startujemy</marquee>")
})

server.listen(3000);
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")