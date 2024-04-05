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