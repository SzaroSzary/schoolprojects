var Datastore = require('nedb')
var coll = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});
var doc = {
    a: "a",
    b: "b"
};
/*console.log("START " + new Date().getMilliseconds())
for (var i = 0; i < 5; i++) {
    coll.insert(doc, function (err, newDoc) {
        console.log("INSERT " + new Date().getMilliseconds() + "- " + newDoc._id)
    });
}
console.log("STOP " + new Date().getMilliseconds())
coll.findOne({ _id: "4KKpN1p6CfllCVGb" }, function (err, doc) {
    console.log(JSON.stringify(doc, null, 5))
});
coll.find({}, function (err, docs) {
    //zwracamy dane w postaci JSON, wraz z formatowaniem (5 znaków wcięcia)
    console.log(JSON.stringify({ "docsy": docs }, null, 5))
});
coll.find({ a: "xxx" }, function (err, docs) {
    // szukam dokumentu / rekordu gdzie a = "xxx"
    console.log(JSON.stringify({ "docsy": docs }, null, 5))
});

coll.count({}, function (err, count) {
    console.log(count)
});
coll.count({ a: 'xxx' }, function (err, count) {
    // zwracam liczbę dokumentów / rekordów gdzie a = "xxx"
    console.log(count)
});
coll.remove({ "a": "xxx" }, {}, function (err, numRemoved) {
    // usuwam pierwszy dokument gdzie a = "xxx"
    console.log(numRemoved)
});
coll.remove({ "a": "xxx" }, { multi: true }, function (err, numRemoved) {
    // usuwam wszystkie dokumenty gdzie a = "xxx"
    console.log(numRemoved)
});*/
coll.remove({}, { multi: true }, function (err, numRemoved) {
    console.log(numRemoved)
});