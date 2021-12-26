const express = require('express');
const router = express.Router();

const midleware = require('../../midleware/auth');
const userController = require('../../controllers/users');

router.get('/:userId/myProfile', midleware.auth, userController.showOneUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.login);
router.patch('/:userId/myProfile', midleware.auth, userController.updateUser);

module.exports = router;

  // function authenticateToken(req, res, next) {
  //   const authHeader = req.headers['authorization']
  //   const token = authHeader && authHeader.split(' ')[1]
  //   if (token == null) return res.sendStatus(401)

  //   jwt.verify(token, config.get('auth').jwt_key, (err, user) => {
  //     console.log(err)
  //     if (err) return res.sendStatus(403)
  //     req.user = user
  //     next()
  //   })
  // };