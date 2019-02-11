var http = require("http");
var server = http.createServer(function (req, res) {

})

server.listen(3000);
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")
require("colors");

console.log("tekst na czerwono".red)
console.log("tekst na zielono".green)
console.log("tekst na tęczowo".rainbow)