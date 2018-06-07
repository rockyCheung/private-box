var crypto = require("crypto");
var eccrypto = require("eccrypto");

var privateKey = function(){
  // A new random 32-byte private key.
  var privateKey = crypto.randomBytes(32);
  return privateKey;
};

var publicKey = function(privateKey){
  // Corresponding uncompressed (65-byte) public key.
  var publicKey = eccrypto.getPublic(privateKey);
  return publicKey;
};
//key exchange
var ecdh = function(privateKeyA, publicKeyB,callback){
  eccrypto.derive(privateKeyA, publicKeyB).then(function(sharedKey1) {
    callback(sharedKey1);
  });
}
var generator = {};
generator.privateKey = privateKey;
generator.publicKey = publicKey;
generator.ecdh = ecdh;

module.exports = generator;
