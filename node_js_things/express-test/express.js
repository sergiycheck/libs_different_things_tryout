const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3003;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//node-mssql
//https://www.npmjs.com/package/mssql

//msnodesqlv8
//https://www.npmjs.com/package/msnodesqlv8

app.get("/db", (req, res, next) => {
  console.log("getting db");

  // const sqlServer = require('mssql');
  // var config = {
  //     server:'(localdb)\\MSSQLLocalDB',
  //     database: 'ScadaTraceModeDb'
  // };
  // sqlServer.connect(config,(err)=>{
  //     if(err){
  //         console.log(err);
  //     }
  //     let request = new sqlServer.Request();
  //     request.query('select * from TestTable', (err,recordset)=>{
  //         if(err){
  //             console.log(err);
  //         }
  //         res.send(recordset);

  //     })
  // });

  const sql = require("msnodesqlv8");

  const connectionString =
    "server=(localdb)\\MSSQLLocalDB;Database=ScadaTraceModeDb;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
  const query = "select * from TestTable";

  try {
    sql.query(connectionString, query, (err, rows) => {
      console.log(rows);
      res.send(rows);
    });
  } catch (error) {
    console.log(error);
  }
});

//https://www.npmjs.com/package/modify-response-middleware
//https://medium.com/devschacht/an-update-on-es6-modules-in-node-js-e0e7dcc44c6e

app.get("/", (req, res) => {
  console.log(req.query);
  res.send(`Hi! ${req.url}`);
});

app.get("/get-params/:param", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

app.get("/get-route/:route", (req, res) => {
  console.log(req.query.a);
  console.log(req.params.route);
  res.send(req.params);
});

app.put("*", (req, res) => {
  //any request
  res.send("put request!");
});

app.post("/user", (req, res) => {
  //any request
  const message = JSON.stringify(req.body);
  console.log(message);
  res.send(message);
});

app.listen(port, () => console.log("Server ready"));

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});
