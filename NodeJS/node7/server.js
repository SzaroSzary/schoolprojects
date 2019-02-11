var http = require("http");
var fs = require("fs");
var mongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
var Operations = require("./appDir/modules/Operations.js");
var db;
var opers = new Operations();
var socketio = require("socket.io")
var server = http.createServer(function (request, response) {
    console.log("żądany przez przeglądarkę adres: " + request.url)
    switch (request.method) {
        case "GET":
            if (request.url === "/index.html") {
                fs.readFile("appDir/staticDir/index.html", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(data);
                    response.end();
                })
            }
            /*else if (request.url === "/js/Main.js") {
                fs.readFile("appDir/modules/Operations.js", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'application/javascript' });
                    response.write(data);
                    response.end();
                })
            }*/
            else {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.write("<h1>404 - brak takiej strony</h1>");
                response.end();

            }
            break;
    }
})
server.listen(3000);
var coll
var database
var obj =
    {
        login: "",
        password: "",
    };
mongoClient.connect("mongodb://localhost/3ic1", function (err, db) {
    if (err) console.log(err)
    else console.log("mongo podłączone")
    db.createCollection("3ic1", function (err, coll) {})
    database = db
    //tu można operować na utworzonej bazie danych db lub podstawić jej obiekt 
    // pod zmienną widoczną na zewnątrz    
})
var io = socketio.listen(server) // server -> server nodejs
io.sockets.on("connection", function (client) {
    coll = database.collection("3ic1")
    client.emit("onconnect", {
    })
    client.on("add", function (data) {
        opers.Insert(coll, data)
    })
    client.on("select", function () {
        var items = opers.SelectAll(coll, function(items) {
                client.emit("select", {
                    res: JSON.stringify(items, null, 3)
                })
            })
    })
    client.on("update", function (data) {
        opers.UpdateById(ObjectID, coll, data)
    })
    client.on("delete", function (data) {
        opers.DeleteById(ObjectID, coll, data.id)
    })
})