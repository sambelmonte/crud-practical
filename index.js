const express = require('express');
const app = express();

app.use(express.static('public'));

app.use('/', function (req, res){
  res.send('hi');
});

app.listen(process.env.port || 3000, () => {
  console.log('Running at Port 3000');
});
