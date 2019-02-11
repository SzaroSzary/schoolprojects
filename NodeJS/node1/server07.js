var http = require("http");
require("colors");
var server = http.createServer(function (req, res) {
    switch (req.url) {
        case "/A", "/a":
            res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
            res.end("<marquee style='color:red;'>startujemy na 3000</marquee>")
            console.log("tekst na czerwono".red)
            break;
        case "/B", "/b":
            res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
            res.end("<marquee style='color:green;'>startujemy na 3000</marquee>")
            console.log("tekst na zielono".green)
            break;
        case "/C", "/c":
            res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
            res.end("<marquee style='color:blue;'>startujemy na 3000</marquee>")
            console.log("tekst na tęczowo".rainbow)
            break;
    }
})

server.listen(3000);
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")