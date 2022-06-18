//mongodb atlas link
//https://cloud.mongodb.com/v2#/org/61eb024e5d092874ef01f500/projects

// For a replica set, include the replica set name and a seedlist of the members in the URI string; e.g.
// const uri = 'mongodb://mongodb0.example.com:27017,mongodb1.example.com:27017/?replicaSet=myRepl'
// For a sharded cluster, connect to the mongos instances; e.g.
// const uri = 'mongodb://mongos0.example.com:27017,mongos1.example.com:27017/'
import { MongoClient } from "mongodb";

// const uri = "mongodb://localhost:27017";
const uri =
  "mongodb+srv://node-shop-nlwkef12fe:node-shop-nlwkef12fe@node-rest-shop.g1mue.mongodb.net";
const db1Name = "myTransactionsdb1";
const db2Name = "myTransactionsdb1";

const client = new MongoClient(uri);
await client.connect();
// Prereq: Create collections.
let res = await client
  .db(db1Name)
  .collection("foo")
  .insertOne({ abc: 0 }, { writeConcern: { w: "majority" } });

console.log("insert 1 res", res);

res = await client
  .db(db2Name)
  .collection("bar")
  .insertOne({ xyz: 0 }, { writeConcern: { w: "majority" } });

console.log("insert 2 res", res);

// Step 1: Start a Client Session
const session = client.startSession();
// Step 2: Optional. Define options to use for the transaction
const transactionOptions = {
  readPreference: "primary",
  readConcern: { level: "local" },
  writeConcern: { w: "majority" },
};
// Step 3: Use withTransaction to start a transaction, execute the callback, and commit (or abort on error)
// Note: The callback for withTransaction MUST be async and/or return a Promise.
try {
  await session.withTransaction(async () => {
    const coll1 = client.db(db1Name).collection("foo");
    const coll2 = client.db(db2Name).collection("bar");
    // Important:: You must pass the session to the operations
    let transactionRes = await coll1.insertOne({ abc: 1 }, { session });
    console.log("transactionRes 1", transactionRes);
    transactionRes = await coll2.insertOne({ xyz: 999 }, { session });
    console.log("transactionRes 2", transactionRes);
  }, transactionOptions);
} finally {
  await session.endSession();
  await client.close();
}
