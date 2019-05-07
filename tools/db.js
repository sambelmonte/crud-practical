var mysql = require('mysql');
var config = require('../config/db.json');

var con = mysql.createConnection(config.db);
con.connect(function(err){
  if (err) throw err;
  console.log("DB connected!");
})

module.exports = con;
