const express = require('express');
const router = express.Router();

const midleware = require('../../midleware/auth');
const recipeController = require('../../controllers/recipes');

router.get('/', midleware.auth, recipeController.getRecipes);
router.get('/breakfast', midleware.auth, recipeController.breakfast);
router.get('/brunch', midleware.auth, recipeController.brunch);
router.get('/lunch', midleware.auth, recipeController.lunch);
router.get('/dinner', midleware.auth, recipeController.dinner);
router.get('/freshNew', midleware.auth, recipeController.freshNew);
router.get('/popular', midleware.auth, recipeController.mostPopular);
router.get('/:id', midleware.auth, recipeController.fetchOne);
router.post('/new', midleware.auth, recipeController.createRecipe);
// router.post('/new/img', recipeController.uploadImg); //upload image
router.patch('/:id', midleware.auth, recipeController.updateRecipe);
router.patch('/:id/like', midleware.auth, recipeController.likeRecipe);
router.delete('/:id', midleware.auth, recipeController.deleteRecipe);

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