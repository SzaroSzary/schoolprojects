var fs = require("fs")
module.exports = function (req, res) {
    var lang = {
        language: function () {
            var n = req.headers["accept-language"]
            n = n.toString()
            n = n.split(",")
            var available = []
            for (var i = 0; i < n.length; i++) {
                var m = n[i].split(";");
                for (var j = 0; j < m.length; j++) {
                    if (j<1) {
                        available.push({ "lng": m[0] })
                    }
                }
            }
            return available
        },
        setOptions: function (first, second) {
            fs.readFile("staticDir/" + first[0].lng + "/" + second, function (error, data) {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                    res.end();
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                }
            });
        }
    }
    return lang
}