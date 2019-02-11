var http = require("http");
var logger = require('tracer').colorConsole();
var server = http.createServer(function (req, res) {
    // parametr res oznacza obiekt odpowiedzi serwera (response)
    // parametr req oznacza obiekt żądania klienta (request)
})

server.listen(3000);
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")

logger.log('hello');
logger.trace('hello');
logger.debug('hello');
logger.info('hello');
logger.warn('hello');
logger.error('hello');