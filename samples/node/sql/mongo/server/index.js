var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var myobj = { name: "xuxian", age: "20" };
    dbo.collection("user").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("success");
        db.close();
    });
});