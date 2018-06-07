const  mysql      = require('mysql');
const  connection = mysql.createConnection({
  host     : '192.168.1.110',
  user     : 'root',
  password : '1122qq..',
  database : 'pribox'
});

var preparedExcutor = function(preparedStatement,params,callback){
  connection.connect();
  var startTime = Date.now();
  console.log("Excute start,start time %s,preparedStatement:%s,params:%s",startTime,preparedStatement,params);
  connection.query(preparedStatement,params, function (err, data) {
		connection.end();
		callback(err, data);
    var endTime = Date.now();
    var consuming = endTime-startTime;
    console.log("Excute end,end time %s,consuming time ",endTime,consuming);
	});
};

module.exports = preparedExcutor;
