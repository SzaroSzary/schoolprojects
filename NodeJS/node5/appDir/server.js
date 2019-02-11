var http = require("http");
var fs = require("fs");
var qs = require("querystring")
var usertab = [];
var currentgametab = [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2]
];
var newgametab2 = []
var newgametab = [
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2]
]
var server = http.createServer(function (request, response) {
    console.log("żądany przez przeglądarkę adres: " + request.url)
    switch (request.method) {
        case "GET":
            if (request.url === "/index.html") {
                fs.readFile("staticDir/index.html", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(data);
                    response.end();
                })
            }
            else if (request.url === "/style.css") {
                fs.readFile("staticDir/style.css", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'text/css' });
                    response.write(data);
                    response.end();
                })
            }
            else if (request.url === "/js/Game.js") {
                fs.readFile("staticDir/js/Game.js", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'application/javascript' });
                    response.write(data);
                    response.end();
                })
            }
            else if (request.url === "/js/Net.js") {
                fs.readFile("staticDir/js/Net.js", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'application/javascript' });
                    response.write(data);
                    response.end();
                })
            }
            else if (request.url === "/js/UI.js") {
                fs.readFile("staticDir/js/UI.js", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'application/javascript' });
                    response.write(data);
                    response.end();
                })
            }
            else if (request.url === "/libs/three.js") {
                fs.readFile("staticDir/libs/three.js", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'application/javascript' });
                    response.write(data);
                    response.end();
                })
            }
            else if (request.url === "/img/white.jpg") {
                fs.readFile("staticDir/img/white.jpg", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    response.write(data);
                    response.end();
                })
            }
            else if (request.url === "/img/black.jpg") {
                fs.readFile("staticDir/img/black.jpg", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    response.write(data);
                    response.end();
                })
            }
            else {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.write("<h1>404 - brak takiej strony</h1>");
                response.end();

            }
            break;
        case "POST":
            servResp(request, response)
            break;
    }
    function servResp(req, res) {
        var allData = "";
        req.on("data", function (data) {
            allData += data;
        })
        req.on("end", function (data) {
            var finishObj = qs.parse(allData)
            console.log(finishObj)
            switch (finishObj.akcja) {
                case "ADD_USER":
                    var end = false
                    for (var i = 0; i < usertab.length; i++) {
                        if(finishObj.user==usertab[i]){
                            response.end("Nicki nie mogą się powtarzać")
                            end = true;
                        }
                    }
                    if (!end) {
                        usertab.push(finishObj.user)
                        if (usertab.length < 3) {
                            if (usertab.length == 1) {
                                response.end("Pomyślnie dodano użytkownika. Czekaj na drugiego gracza...;" + JSON.stringify(currentgametab))
                            }
                            else {
                                response.end("Pomyślnie dodano użytkownika;" + JSON.stringify(currentgametab));
                            }
                        }
                        else {
                            response.end("Obecnie jest za dużo użytkowników");
                        }
                    }
                    break;
                case "DELETE_USERS":
                    usertab = []
                    response.end("Użytkownicy usunięci");
                    break;
                case "CHECK_USERS":
                    if (usertab.length < 2) {
                        response.end("Oczekiwanie na drugiego gracza...")
                    }
                    else {
                        response.end("Przygotuj się do gry...")
                    }
                    break;
                case "UPDATE_GAMETAB":
                    for (var i = 0; i < currentgametab.length; i++) {
                        for (var j = 0; j < currentgametab[i].length; j++) {
                            newgametab[i][j] = currentgametab[i][j]
                        }
                    }
                    if (finishObj.player == 1) {
                        newgametab[finishObj.oldz][finishObj.oldx] = 0
                        newgametab[finishObj.z][finishObj.x] = 1
                    }
                    else {
                        newgametab[finishObj.oldz][finishObj.oldx] = 0
                        newgametab[finishObj.z][finishObj.x] = 2
                    }
                    for (var i = 0; i < newgametab.length; i++) {
                        for (var j = 0; j < newgametab[i].length; j++) {
                            currentgametab[i][j] = newgametab[i][j]
                        }
                    }
                    response.end(JSON.stringify(currentgametab))
                    break;
                case "COMPARE_GAMETAB":
                    if (JSON.stringify(currentgametab) === JSON.stringify(newgametab)) {
                        response.end("")
                    }
                    else {
                        response.end(JSON.stringify(currentgametab))
                    }
                    break;
            }
        })
    }
})

server.listen(3000);
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")
