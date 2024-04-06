const router = require('express').Router()
const db = require('../../config/connection')
const { user } = require('../../models')

router.get('/', async (req, res) => {

    try {
      const result = await user.find({}).lean();
      res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  router.get('/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const result = await user.findById(userId).lean();
  
      if (!result) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  router.post('/', async (req, res) => {
    const userData = req.body;
  
    try {
      const newUser = await user.create(userData);
      res.status(201).json(newUser);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
  
    try {
      const updatedUser = await user.findByIdAndUpdate(userId, updatedUserData, { new: true });
      
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
  router.delete('/api/user/:id', async (req, res) => {
    try {
      const result = await Post.findOneAndDelete({ _id: req.params.id });
  
      if (!result) {
        // If the post was not found, return a 404 status code
        res.status(404).json({ error: 'Post not found' });
        console.log('Post not found');
      } else {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      }
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  module.exports = router

// const router = require("express").Router();

// const {
//   getAllUser,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser,
//   addFriend,
//   removeFriend,
// } = require("../../controllers/user-controller");

// // /api/users
// router.route("/").get(getAllUser).post(createUser);

// // /api/users/:id
// router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// // /api/users/:userId/friends/:friendId
// router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

//   module.exports = router