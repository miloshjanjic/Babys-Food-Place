const User = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

module.exports = {
  registerUser: async (req, res) => {
    try {
      if (!req.body.password || req.body.password != req.body.repeatPassword) {
        return res.status(400).send({
          error: true,
          message: 'Bad request. Passwords don`t match'
        });
      }

      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).send({
          error: true,
          message: 'This email already exists!'
        });
      }

      req.body.password = bcrypt.hashSync(req.body.password);
      req.body.repeatPassword = bcrypt.hashSync(req.body.repeatPassword);

      const newUser = await User.create(req.body);
      res.status(201).send({
        error: false,
        message: `User ${req.body.email} registered!`,
        newUser
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `Internal server error: ${error}`
      });
    }
  },

  login: async (req, res) => {
    // const { email, password } = req.body
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(400).send({
          error: true,
          message: 'No user with such email',
          user,
        });
      }

      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).send({
          error: true,
          message: 'Incorrect password'
        });
      }

      const payload = {
        id: user._id,
        email: user.email,
        fullName: `${user.firstName} ${user.lastName}`
      };

      const token = jwt.sign(payload, config.get('auth').jwt_key,
       /*'secret_key'*/  {
          expiresIn: '180m'
        });

      res.send({    // added cookie and "token" ".cookie("token", token)"
        error: false,
        message: 'JWT successfully generated',
        token: token,
        user
        // user: {
        //   id: payload._id
        // }
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `Internal server error: ${error}`
      });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find();

      res.status(200).send({
        error: false,
        message: `All users are here:`,
        users
      });
    } catch (error) {
      res.status(404).send({
        error: true,
        message: error.message
      });
    }
  },

  showOneUser: async (req, res) => {
    try {
      const { userId } = req.params.id;
      const user = await User.findById(userId);

      res.status(200).send({
        error: false,
        message: `User ${userId} is here`,
        user
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `Internal server error: ${error}`
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      //const token = req.headers['x-access-token'] //! add after
      const { userId } = req.params;//
      //const decoded = jwt.verify(token, config.get('auth').jwt_key); //! add after
      //const userId = decoded._id; //! add after
      //const user = await User.findById(userId); //! added after

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).send({
          error: true,
          message: `No user with id: ${userId}`
        });
      };

      const body = req.body;
      // req.body.password = bcrypt.hashSync(req.body.password);
      // req.body.repeatPassword = bcrypt.hashSync(req.body.repeatPassword);
      const updatedUser = await User.findByIdAndUpdate(
        userId, body, { new: true } // added body: user
      );
      res.status(200).send({
        error: false,
        message: `User ${userId} is updated!`,
        //token: token, //! add after
        updatedUser
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `Internal server error: ${error}`
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const deletedUser = await User.findByIdAndDelete(userId);
      res.status(200).send({
        error: false,
        message: `User ${userId} is deleted`,
        deletedUser
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: `Internal server error: ${error}`
      });
    }
  }

};