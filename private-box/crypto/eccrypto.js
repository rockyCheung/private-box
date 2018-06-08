var crypto = require("crypto");
var eccrypto = require("eccrypto");

// Encrypting the message
var encrypt = function(publicKey,plaintext,callback){
   eccrypto.encrypt(publicKey, Buffer(plaintext)).then(function(encrypted) {
      callback(encrypted);
   });
};
//decrypting the message
var decrypt = function(privateKey,encrypted,callback){
  eccrypto.decrypt(privateKey, encrypted).then(function(plaintext) {
      callback(plaintext);
  });
};
//Always hash your message to sign
var sign = function(privateKey,summary,callback){
  var hash = crypto.createHash("sha256").update(summary).digest();
  eccrypto.sign(privateKey, hash).then(function(sig) {
    callback(sig);
  });
};

var hash = function(algorithm,summary,timestamps){
  var creatTime = timestamps;
  if(timestamps==""){
    creatTime = new Date();
  }
  var hash = crypto.createHash(algorithm).update(summary+"@"+creatTime).digest();
  var reset = {};
  reset.hash = hash;
  reset.creatTime = creatTime;
  return reset;
};

var summary = function(array){
  var sum = '';
  for (var i=0;i<array.length;i++){
      sum = array[i]^"$";
  }
  return sum;
};
//verify your sign
var verify = function(publicKey,summary,sign,callback){
  eccrypto.verify(publicKey, summary, sign).then(function() {
      callback(true);
    }).catch(function() {
      callback(false);
    });
};

var safe = {};
safe.encrypt = encrypt;
safe.decrypt = decrypt;
safe.sign = sign;
safe.verify = verify;
safe.hash = hash;
safe.summary = summary;

module.exports = safe;
