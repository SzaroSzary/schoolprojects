var Datastore = require('nedb')
    var coll = new Datastore({
        filename: 'kolekcja.db',
        autoload: true
    });
    var doc = {
        a: "a",
        b: "b"
    };
    coll.insert(doc, function (err, newDoc) {
        console.log("dodano: " + newDoc._id)
    });
    console.log(doc)