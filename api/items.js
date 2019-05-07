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

module.exports = router;
