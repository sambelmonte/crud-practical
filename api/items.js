const express = require('express');
const router = express.Router();
const db = require('../tools/db_functions');

router.get('/', function (req, res) {
  let conditions = null;
  if (req.query.id){
    conditions = "id = " + req.query.id;
  }
  db.get_items(conditions, function(results){
    if (results.success){
      if (results.data){
        res.status(200)
          .json({
            results: results.data,
            length: results.data.length
          });
      } else {
        res.status(404).end();
      }
    } else {
      res.status(500).end();
    }
  });
});

router.post('/new', function(req, res){
  let variables = [];
  let new_data = [];
  let errors = [];
  if (req.body.name){
    variables.push("name");
    new_data.push("'" + req.body.name + "'");
  } else {
    errors.push("Name is required.");
  }
  if (req.body.qty){
    if (!isNaN(parseInt(req.body.qty))){
      variables.push("qty");
      new_data.push("'" + req.body.qty + "'")
    } else {
      errors.push("Qty should be a number.");
    }
  }
  if (req.body.amount){
    if (!isNaN(parseInt(req.body.amount))){
      variables.push("amount");
      new_data.push("'" + req.body.amount + "'")
    } else {
      errors.push("Amount should be a number.");
    }
  }
  if (errors.length < 1){
    db.create_item(variables.join(","), new_data.join(","), function(results){
      if (results.success){
        res.status(200)
          .json({
            item_id: results.data.id
          });
      } else {
        res.status(500).end();
      }
    });
  } else {
    res.status(400)
      .json({
        message: errors.join(" ")
      });
  }
});

router.put('/update', function(req, res){
  if (req.body.id){
    let new_data = [];
    let errors = [];
    if (req.body.name){
      new_data.push("name = '" + req.body.name + "'");
    }
    if (req.body.qty){
      if (!isNaN(parseInt(req.body.qty))){
        new_data.push("qty = '" + req.body.qty + "'")
      } else {
        errors.push("Qty should be a number.");
      }
    }
    if (req.body.amount){
      if (!isNaN(parseInt(req.body.amount))){
        new_data.push("amount = '" + req.body.amount + "'")
      } else {
        errors.push("Amount should be a number.");
      }
    }
    if (errors.length < 1){
      if (new_data.length > 0){
        db.update_item(req.body.id, new_data.join(", "), function(results){
          if (results.success){
            if (results.data.updated){
              res.status(200)
                .json({
                  message: "Item updated successfully."
                });
            } else {
              res.status(404)
                .json({
                  message: "The item does not exist."
                });
            }
          } else {
              res.status(500).end();
          }
        });
      } else {
        res.status(400)
          .json({
            message: "Nothing to update."
          });
      }
    } else {
      res.status(400)
        .json({
          message: errors.join(" ")
        });
    }
  } else {
    res.status(400)
      .json({
        message: "Id is required."
      });
  }
});

router.delete('/', function(req, res){
  if (req.query.id){
    db.delete_item(req.query.id, function(results){
      if (results.success){
        res.status(200)
          .json({
            message: "Item removed successfully."
          });
      } else {
        res.status(500).end();
      }
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
