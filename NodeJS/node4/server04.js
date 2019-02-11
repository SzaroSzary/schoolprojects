var http = require("http")
var fs = require("fs")
var qs = require("querystring")
var Datastore = require('nedb')
var coll = new Datastore({
    filename: 'czas.db',
    autoload: true
});
var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            fs.readFile("index04.html", function (error, data) {
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
            var finish = qs.parse(allData)
            console.log(finish)
            coll.insert(finish, function (err, newDoc) {
                console.log("dodano: " + newDoc._id)
                coll.count({}, function (err, count) {
                    console.log(count)
                    res.end(JSON.stringify(count))
                })
            });
        })
    }
})
server.listen(3000);
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")
/*while(doing) {
    coll.insert(doc, function (err, newDoc) {
        console.log("INSERT " + new Date().getMilliseconds() + "- " + newDoc._id)
    });
}*/