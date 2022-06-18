var express = require('express');
const { route } = require('.');
var router = express.Router();

const {getName} = require("../services/user.service");
const {saveName} = require("../services/user.service");
const {isAuthorized} = require("../middlewares/auth.middleware");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/get-name',(req, res, next)=>{
  console.log(req.body);
  const name = getName(req.body);
  if(name){
    res.send(`Your name is ${name}`);
  }else{
    res.status(400).send(`Error with getting name`);
  }
});

router.post('/save-name',isAuthorized,(req,res,next)=>{
  const saved = saveName(req.body);
  const name = getName(req.body);
  if(saved){
    res.send(`${name} saved correctly`);
  }else{
    res.status(400).send("Error happend");
  }
});

module.exports = router;
