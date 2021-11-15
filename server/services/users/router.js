const express = require('express');
const userController = require('../../controllers/users'); 

const router = express.Router();

router.get('/:userId/myProfile', userController.showOneUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.login);
router.patch('/:userId/myProfile', userController.updateUser);

module.exports = router;