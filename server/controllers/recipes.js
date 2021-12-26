const Recipe = require('../models/recipeModel');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = {
  getRecipes: async (req, res) => {
    //const token = req.headers['x-access-token'] //! add after
    try {
      const recipes = await Recipe.find();
      res.status(200).send({
        error: false,
        message: `All recipes are fetched !`,
        recipes
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `Internal server error: ${error}`
      });
    }
  },

  fetchOne: async (req, res) => {
    try {
      const { id } = req.params;
      const recipeOne = await Recipe.findById(id);

      res.status(200).send({
        error: false,
        message: `Recipe ${recipe.title} is fetched !`,
        recipeOne
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `Internal server error: ${error}`
      });
    }
  },

  createRecipe: async (req, res) => {
    try {
      const { title, category, prepTime, noPeople, shortDescription, recipe, picture } = req.body;

      const postRecipe = new Recipe({
        title, category, prepTime, noPeople, shortDescription, recipe, picture
      });

      // const newRecipe = Recipe(req.body);
      await postRecipe.save();

      res.status(201).send({
        error: false,
        message: `Recipe ${recipe.title} is created !`,
        postRecipe
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `Internal server error: ${error}`
      });
    }
  },

  updateRecipe: async (req, res) => {
    try {
      const { id: _id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send({
          error: true,
          message: `No recipe with id: ${_id}`
        });
      };
      const body = req.body;
      const updatedRecipe = await Recipe.findByIdAndUpdate(_id, body, { new: true });

      res.status(200).send({
        error: false,
        message: `Recipe ${_id} is updated !`,
        updatedRecipe
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `Internal server error: ${error}`
      });
    }
  },

  likeRecipe: async (req, res) => {
    try {
      //const token = req.headers['x-access-token'] //! add after
      const { id } = req.params;
      const recipe = await Recipe.findById(id);
      const likedRecipe = await Recipe.findByIdAndUpdate(
        id, { likeCount: recipe.likeCount + 1 }, { new: true });

      res.status(200).send({
        error: false,
        message: `You liked ${recipe.title} recipe.`,
        likedRecipe
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `Internal server error: ${error}`
      });
    }
  },

  deleteRecipe: async (req, res) => {
    try {
      //const token = req.headers['x-access-token'] //! add after
      const { id } = req.params;
      const deletedRecipe = await Recipe.findByIdAndDelete(id);
      res.status(200).send({
        error: false,
        message: `Recipe ${id} is deleted`,
        deletedRecipe
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `Internal server error: ${error}`
      });
    }
  },

  breakfast: async (req, res) => {
    try {
      //const token = req.headers['x-access-token'] //! add after
      const breakfast = await Recipe.find({ category: 'breakfast' }).exec();
      res.status(200).send({
        error: false,
        message: `Breakfast recipes are here`,
        breakfast: breakfast
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `Internal server error: ${error}`
      });
    }
  },

  brunch: async (req, res) => {
    try {
      const brunch = await Recipe.find({ category: 'brunch' }).exec();
      res.status(200).send({
        error: false,
        message: `Brunch recipes are here`,
        brunch
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `Internal server error: ${error}`
      });
    }
  },

  lunch: async (req, res) => {
    try {
      const lunch = await Recipe.find({ category: `lunch` }).exec();
      res.status(200).send({
        error: false,
        message: `Lunch recipes are here`,
        lunch
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `Internal server error: ${error}`
      });
    }
  },

  dinner: async (req, res) => {
    try {
      const dinner = await Recipe.find({ category: 'dinner' }).exec();
      res.status(200).send({
        error: false,
        message: `Dinner recipes are here`,
        dinner
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `Internal server error: ${error}`
      });
    }
  },

  freshNew: async (req, res) => {
    try {
      //const token = req.headers['x-access-token'] //! add after
      const freshNew = await (await Recipe.find().sort({ createdAt: -1 })).slice(0, 3);
      res.status(200).send({
        error: false,
        message: `Fresh and New recipes are here`,
        freshNew
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `Internal server error: ${error}`
      });
    }
  },

  mostPopular: async (req, res) => {
    try {
      //const token = req.headers['x-access-token'] //! add after
      const mostPopular = await (await Recipe.find().sort({ likeCount: -1 })).slice(0, 6);
      res.status(200).send({
        error: false,
        message: `Popular recipes are here`,
        mostPopular
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `Internal server error: ${error}`
      });
    }
  }
};
