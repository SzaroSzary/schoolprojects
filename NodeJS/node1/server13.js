var http = require('http');
var url = require('url');
var fs = require("fs");

var server = http.createServer(function (req, response) {

    //tu następuje proces  pobrania i sparsowania danych a,b,c
    //true = zwraca obiekt JSON, false - czyste dane 
    var obj = url.parse(req.url, true).query
    if (obj.strona == "index") {
        fs.readFile("static/index.html", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        })
    }
    else if (obj.strona == "second") {
        fs.readFile("static/second.html", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        })
    }
    else if (obj.promien) {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write((3.14*obj.promien*obj.promien)+"");
        response.end();
    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write("<h1>404 - brak takiej strony</h1>");
        response.end();
    }
    console.log(obj);
})
server.listen(3000);