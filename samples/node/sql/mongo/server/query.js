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
    delete(obj, isMany) {
        return new Promise((resolve, reject) => {
            this._connect().then(client => {
                let db = client.db(this.dbName);
                if (isMany) {
                    db.collection(this.collectionName).deleteMany(obj).then(res => {
                        resolve(res);
                        client.close();
                    });
                } else {
                    db.collection(this.collectionName).deleteOne(obj).then(res => {
                        resolve(res);
                        client.close();
                    });
                }
            });
        })
    }
    update(filter, updater) {
        return new Promise((resolve, reject) => {
            this._connect().then(client => {
                let updaterCpy = { $set: updater }; //db.col.update({"count":{$gt:1}},{$set:{"test2":"OK"}});
                let db = client.db(this.dbName); //连接数据库
                db.collection(this.collectionName).updateMany(filter, updaterCpy).then(res => {
                    resolve(res);
                    client.close();
                })
            })
        })
    }
    query(obj) {
        obj = obj || {} //查询条件，不传参数就默认全部
        let arr = []
        return new Promise((resolve, reject) => {
            this._connect().then(client => {
                let db = client.db(this.dbName);
                let queryRes = db.collection(this.collectionName).find(obj)
                    //console.log(queryRes);
                console.log(queryRes.each((err, data) => { console.log(data) }))
                    // queryRes.each((err, data) => {
                    //     if (data != null) {
                    //         arr.push(data)
                    //     } else {
                    //         resolve(arr)
                    //     }
                    // })
                client.close()
            })
        }).catch(() => {})
    }
}

const dao = new DAO('mongodb://localhost:27017/', 'test', 'user')
    // dao.query()
dao.query().then(arr => { console.log(arr) })

// let obj = { name: "xushilin", age: "20" };
// dao.insert(obj).then(res => { console.log(res) });

// let arr = [];
// for (let i = 0; i < 10; i++) {
//     arr.push({
//         userId: "铁蛋",
//         age: i
//     });
// }
// dao.insert(arr, true).then(res => { console.log(res) });

// let obj = { userId: "铁蛋" };
// dao.delete(obj, true).then(res => { console.log(res) });

// let filter = { name: "xuxian" };
// let update = { name: "fahai", age: "2000" };
// dao.update(filter, update).then(res => {});