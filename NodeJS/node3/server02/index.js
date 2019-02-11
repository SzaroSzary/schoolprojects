// ta funkcja zwraca obiekt 
// który można wykorzystać w innym pliku
// np w pliku serwera

module.exports = function () {

    var CD = {
        title: "",
        author: "",
        rate: 0,
        getCD: function () {

            return "autor: " + this.author +
                    ", tytuł: " + this.title +
                    ", ocena: " + this.rate
        }
    }

    return CD

}