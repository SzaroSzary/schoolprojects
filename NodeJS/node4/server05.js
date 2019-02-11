var http = require("http")
var fs = require("fs")
var qs = require("querystring")
var Datastore = require('nedb')
var coll = new Datastore({
    filename: 'miasta.db',
    autoload: true
});
var cos = null
var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            fs.readFile("index05.html", function (error, data) {
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
            console.log("dziala")
            servResp(req, res)
            break;
    }
    function servResp(req, res) {
        var allData = "";
        req.on("data", function (data) {
            console.log("data: " + data)
            allData += data;
        })
        req.on("end", function (data) {
            res.writeHead(200, { "content-type": "text/plain; charset=utf-8" })
            coll.find({}).sort({ wojewodztwo: 1 }).exec(function (err, docs) {
                console.log(JSON.stringify({ "lokacje": docs }, null, 5))
                res.end(JSON.stringify({ "lokacje": docs }, null, 5))
            });
        })
    }
})
server.listen(3000);
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")