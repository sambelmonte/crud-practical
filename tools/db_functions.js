const sql = require('./db');

module.exports = {
  get_item_by_value: function (data, callback){
    sql.query("SELECT id, name, qty, amount FROM items WHERE " + data, function(error, results, fields){
      if (error) callback({success: false, data: null});
      if (results.length < 1) callback({success: true, data: null});
      else {
        callback({success: true, data: results});
      }
    });
  },
  create_item: function(variables, values, callback){
    sql.query("INSERT INTO items (" + variables + ") VALUES (" + values + ");", function(error, results, fields){
      if (error) callback({success: false, data: null});
      else callback({success: true, data: {id : results.insertId}});
    });
  }//,
  // update_item: function(body){
  //
  // },
  // delete_item: function(id){
  //
  // }
};
