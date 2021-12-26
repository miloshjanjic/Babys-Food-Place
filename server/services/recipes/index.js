require('../../db/index');
const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const upload = require('express-fileupload');
const config = require('../../config/index');

const api = express();
const recipeRoutes = require('./router');

api.use(express.json());
api.use(cors());

api.use(upload());

api.use(jwt({
  secret: config.get('auth').jwt_key,
  algorithms: ['HS256']
})
  // .unless({
  //   path: [
  //     '/recipes/',
  //     '/recipes/popular',
  //     '/recipes/freshNew',
  //     '/recipes/breakfast',
  //     '/recipes/brunch',
  //     '/recipes/lunch',
  //     '/recipes/dinner'
  //   ]
  // })
);

api.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      error: true,
      message: 'You need to log in in order to perform this action'
    });
  }
});

// api.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

api.use('/recipes', recipeRoutes);

const PORT = process.env.PORT || config.get('ports').recipes;

api.listen(PORT, err => {
  if (err) {
    return console.log('Error happened while starting the recipes service: ', err);
  }
  console.log('Recipes service successfully started on port:', PORT);
});