const express = require("express"),
  router = express.Router();
const preparedExcutor = require("./core/db.js");
const generator = require("./crypto/key.js");
//GET home page.
router.get("/", function(req, res) {
  preparedExcutor('SELECT * FROM pribox_users',[],function(error,result){
    console.log(error);
    console.log(result);
  });
  var privateKey = generator.privateKey();
  var publicKey = generator.publicKey(privateKey);
  console.log("the private key is %s",privateKey);
  console.log("the public key is %s",publicKey);
  generator.ecdh(privateKey,publicKey,function(sharedKey){
      var key = new Buffer(sharedKey).toString('base64');
      console.log("the sharedkey is %s",key);
  });
  res.render("index", { title: "Express" });
});

router.get("/pageTwo", function(req, res) {
  res.render("pageTwo", { title: "Page 2" });
});

router.get("/pageThree", function(req, res) {
  res.render("pageThree", { title: "Page 3" });
});

router.get("/pageFour", function(req, res) {
  res.render("pageFour", { title: "Page 4" });
});

module.exports = router;
