var http = require("http");
var qs = require("querystring")
var fs = require("fs");
var tab = ["baanna"]
var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            fs.readFile("static/index6.html", function (error, data) {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                    res.end()
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end()
                }
            });
            break;
        case "POST":
            servResp(req, res)
            break;
    }
    function servResp(req, res) {
        var allData = "";
        req.on("data", function (data) {
            allData += data;
        })
        req.on("end", function (data) {
            console.log(allData)
            switch (allData) {
                case "GET":
                    break;
                case "POST":
                    tab.push("banannext")
                    break;
                case "PUT":
                    tab[0] = "banan" + tab.length
                    break;
                case "DELETE":
                    tab = tab.slice(0, tab.length - 1)
                    break;
            }
            console.log(tab.toString());
            res.end(tab.toString());
        })
    }
})

server.listen(3000);
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")