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

module.exports = safe;
