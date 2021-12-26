require('../../db/index');
const express = require('express');
const proxy = require('express-http-proxy');
const config = require('../../config/index');

const app = express();

// 1 RECIPES:
app.use('/recipes', proxy(
  `http://localhost:4001/recipes`,
  {
    proxyReqPathResolver: (req) => {
      return `http://localhost:4001/recipes${req.url}`
    }
  }
));

//2 USERS:
app.use('/users', proxy(
  `http://localhost:4002/users`,
  {
    proxyReqPathResolver: (req) => {
      return `http://localhost:4002/users${req.url}`
    }
  }
));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

const PORT = process.env.PORT || config.get('ports').proxy;

app.listen(PORT, error => {
  if (error) {
    return console.log(`Could not start proxy: ${error} `)
  }
  console.log('Proxy service successfully started at:', PORT);
});