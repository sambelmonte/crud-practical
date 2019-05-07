const express = require('express');
const router = express.Router();
const db = require('../tools/db_functions');

router.get('/', function (req, res) {
  if (req.query.id){
    db.get_item_by_value("id = " + req.query.id, function(results){
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
  } else {
    res.status(404).end();
  }
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

module.exports = router;
