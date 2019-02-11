var http = require("http");
var fs = require("fs");
var server = http.createServer(function (request, response) {
    console.log("żądany przez przeglądarkę adres: " + request.url)

    if (request.url === "/strona3.html") {
        fs.readFile("static/strona3.html", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        })
    }
    else if (request.url === "/style.css") {
        fs.readFile("static/style.css", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(data);
            response.end();
        })
    }
    else if (request.url === "/script.js") {
        fs.readFile("static/script.js", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'application/javascript' });
            response.write(data);
            response.end();
        })
    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write("<h1>404 - brak takiej strony</h1>");
        response.end();

    }
})

server.listen(3000);
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")