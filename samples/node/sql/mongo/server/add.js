const MongoClient = require('mongodb').MongoClient;

class DAO {
    constructor(url, dbName, collectionName) {
        this.url = url;
        this.dbName = dbName;
        this.collectionName = collectionName;
    }
    _connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, { useUnifiedTopology: true }, (err, client) => {
                if (err) return reject(err);
                resolve(client);
            })
        });
    }
    insert(obj, isMany) {
        return new Promise((resolve, reject) => {
            this._connect().then(client => {
                let db = client.db(this.dbName);
                if (isMany) {
                    db.collection(this.collectionName).insertMany(obj).then(res => {
                        resolve(res);
                        client.close();
                    });
                } else {
                    db.collection(this.collectionName).insertOne(obj).then(res => {
                        resolve(res);
                        client.close();
                    });
                }
            });
        })
    }
}

const dao = new DAO("mongodb://localhost:27017/", "test", "user");
// let obj = { name: "xushilin", age: "20" };
// dao.insert(obj).then(res => { console.log(res) });

let arr = [];
for (let i = 0; i < 10; i++) {
    arr.push({
        userId: "路人" + i,
        age: i
    });
}
dao.insert(arr, true).then(res => { console.log(res) });