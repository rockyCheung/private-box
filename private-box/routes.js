const express = require("express"),
  router = express.Router();
const preparedExcutor = require("./core/db.js");
const generator = require("./crypto/key.js");
const safe = require("./crypto/eccrypto.js");
//GET home page.
router.get("/", function(req, res) {
/*  preparedExcutor('SELECT * FROM pribox_users',[],function(error,result){
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
  */
  res.render("login", { title: "Express" });
});
router.get("/req_register_input.html", function(req, res) {
  res.render("register", { title: "Private Box" });
});

router.get("/req_register.html", function(req, res) {
  var iemail = req.body.email;
  var password = req.body.password;
  var repassword = req.body.repassword;
  if(password==repassword){
      var privateKey = generator.privateKey();
      var publicKey = generator.publicKey(privateKey);
      var pubKeyBase64Code = new Buffer(publicKey).toString('base64');
      password = safe.hash("sha256",password,"");
      var summary = safe.summary(new Array(iemail,password.hash,password.creatTime));
      var sql = "INSERT INTO pribox_users(login_name,pass,sign,private_key,creat_time,login_times,last_login_time,status,public_key)VALUES(?,?,?,?,?,?,?,?,?)";
      var sign = safe.sign(privateKey,summary,function(sig){
        preparedExcutor(sql,[iemail,password.hash,sig,privateKey,password.creatTime,0,'',0,pubKeyBase64Code],function(error,result){
            if(error){
              res.render("error", { title: "Page 2" });
            }else{
              console.log(result);
              res.render("index", { title: "Page 2" });
            }
          });
      });
  }else{
    res.render("pageTwo", { title: "Page 2" });
  }
});

router.get("/req_login.html", function(req, res) {
  var iemail = req.body.email;
  var password = req.body.password;
  preparedExcutor('SELECT * FROM pribox_users where login_name=?',[iemail],function(error,result){
      if(error){
        console.log(error);
        res.render("error", { title: "Page 3" });
      }else{
        console.log(result);
        var ipassword = safe.hash("sha256",password,result.creat_time);
        if(ipassword==result.pass){
          var PRIVATE_USER = {};
          PRIVATE_USER.LOGIN_NAME = iemail;
          req.session.PRIVATE_USER = PRIVATE_USER;
          res.render("index", { title: "Page 3" });
        }else{
          res.render("error", { title: "Page 3" });
        }
      }
    });
});

router.get("/req_add_account.html", function(req, res) {
  var account = req.body.account;
  var password = req.body.password;
  var platformName = req.body.platformName;
  var platformUrl = req.body.platformUrl;
  var remark = req.body.remark;
  var user = req.session.PRIVATE_USER;
  preparedExcutor('SELECT sign,max(id) FROM pribox_secacc limit 1',[],function(error,privious){
    var priviousSign = privious.sign;
    preparedExcutor('SELECT private_key,public_key FROM pribox_users where login_name=?',[user.LOGIN_NAME],function(error,result){
      if(error){
        res.render("error", { title: "Page 3" });
      }else{
        var publicKey = new Buffer(result.public_key,"base64");
        safe.encrypt(publicKey,account,function(accnoutEncrypted){
          account = accnoutEncrypted;
          safe.encrypt(publicKey,password,function(passEncrypted){
            password = passEncrypted;
            var summary = safe.summary(new Array(user.LOGIN_NAME,account,password));
            var privateKey = result.private_key;
            safe.sign(privateKey,summary,function(sig){
              preparedExcutor('INSERT INTO pribox_secacc(account,password,platform_name,platform_url,remark,previous_block,sign,user_email)VALUES(?,?,?,?,?,?,?,?)',[account,password,platformName,platformUrl,remark,priviousSign,sig,user.LOGIN_NAME],function(error,result){
                  res.render("pageFour", { title: "Page 4" });
                });
            });
          });
        });
      }
    });
  });

});

router.get("/req_add_account_input.html", function(req, res) {
  res.render("pageFour", { title: "Page 4" });
});

module.exports = router;
