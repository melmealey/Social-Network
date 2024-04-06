const { user } = require('../models');
const usersController = {

  createUser({ body }, res) {
    user.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  getAllUsers(req, res) {
    user.find({})
      // populate users thoughts
      .populate({ path: 'thoughts', select: '-__v' })
      // populate user friends
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      // .sort({_id: -1})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
}

// Get single user by ID
getUserById({params}, res) {
  user.findOne({_id: params.id })
  .populate({path: 'thoughts', select: '-__v'})
  .populate({path: 'friends', select: '-__v'})
  .select('-__v')
  // return if no user is found 
  .then(dbUserData => {
      if(!dbUserData) {
          res.status(404).json({message: 'No User found with this ID!'});
          return; 
      }
      res.json(dbUserData)
  })
  .catch(err => {
      console.log(err);
      res.status(400).json(err)
  })
}

// Update a current User by ID
updateUsers({params, body}, res) {
  Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
  .then(dbUsersData => {
      if(!dbUsersData) {
          res.status(404).json({message: 'No User found with this ID!'});
          return;
      }
      res.json(dbUserData);
  })
  .catch(err => res.json(err))
}

deleteUsers({params}, res) {
  Users.findOneAndDelete({_id: params.id})
  .then(dbUsersData => {
      if(!dbUsersData) {
          res.status(404).json({message: 'No User found with this ID!'});
          return;
      }
      res.json(dbUsersData);
  })
  .catch(err => res.status(400).json(err));
}

// Delete a current user by ID
addFriend({params}, res) {
  Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
  .populate({path: 'friends', select: ('-__v')})
  .select('-__v')
  .then(dbUsersData => {
      if (!dbUsersData) {
          res.status(404).json({message: 'No User found with this ID!'});
          return;
      }
  res.json(dbUsersData);
  })
  .catch(err => res.json(err));
}

// Delete a current Friend
deleteFriend({ params }, res) {
  Users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
  .populate({path: 'friends', select: '-__v'})
  .select('-__v')
  .then(dbUsersData => {
      if(!dbUsersData) {
          res.status(404).json({message: 'No User found with this ID!'});
          return;
      }
      res.json(dbUsersData);
  })
  .catch(err => res.status(400).json(err));
}

module.exports = usersController

  