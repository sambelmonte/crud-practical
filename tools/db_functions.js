const sql = require('./db');

module.exports = {
  get_items: function (data, callback){
    let new_query = "SELECT id, name, qty, amount FROM items";
    if (data){
      new_query += " WHERE " + data;
    }
    sql.query(new_query, function(error, results, fields){
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
  },
  update_item: function(id, values, callback){
    sql.query("UPDATE items SET " + values + " WHERE id = " + id, function(error, results, fields){
      if (error) callback({success: false, data: null});
      if (results.affectedRows == 0) callback({success: true, data: {updated: false}});
      else callback({success: true, data: {updated: true}});
    });
  },
  delete_item: function(id, callback){
    sql.query("DELETE FROM items WHERE id = " + id, function(error, results, fields){
      if (error) callback({success: false, data: null});
      else callback({success: true, data: null});
    });
  }
};
