const path = require('path'); // prevent repetition of paths
const express = require('express');

var app = express();

const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(port , () => {
  console.log(`Server is up on ${port} `);
});
