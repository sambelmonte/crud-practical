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
  }//,
  // create_item: function(body){
  //
  // },
  // update_item: function(body){
  //
  // },
  // delete_item: function(id){
  //
  // }
};
