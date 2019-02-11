var http = require("http");
require("colors");
var server = http.createServer(function (req, res) {
    if (req.url == "/A") {
        console.log("tekst na czerwono".red)
    } 
    if (req.url == "/B") {
        console.log("tekst na zielono".green)
    }
    if (req.url == "/C") {
        console.log("tekst na tęczowo".rainbow)
    }
})

server.listen(3000);
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")