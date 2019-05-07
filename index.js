const express = require('express');
const app = express();

app.use(express.json());

app.use('/items', require('./api/items'));

app.listen(process.env.port || 3000, () => {
  console.log('Running at Port 3000');
});
