var http = require("http");
var fs = require("fs");
var server = http.createServer(function (request, response) {
    console.log("żądany przez przeglądarkę adres: " + request.url)

    if (request.url === "/strona4.html") {
        fs.readFile("static/strona4.html", function (error, data) {
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
    else if (request.url === "/skrypt.js") {
        fs.readFile("static/skrypt.js", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'application/javascript' });
            response.write(data);
            response.end();
        })
    }
    else if (request.url === "/jquery-3.1.0.min.js") {
        fs.readFile("static/jquery-3.1.0.min.js", function (error, data) {
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