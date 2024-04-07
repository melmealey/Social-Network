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

router.delete('/:id', async (req, res) => {
  try {
    const result = await user.findOneAndDelete({ _id: req.params.id });

    if (!result) {
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

// Add a friend to a user
app.post('/api/users/:userId/friends/:friendId', (req, res) => {
  user.findOneAndUpdate(
    { _id: req.params.userId },
    { $push: { friends: req.params.friendId } },
    { new: true }
  )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));
});

// Delete a friend from a user
app.delete('/api/users/:userId/friends/:friendId', (req, res) => {
  user.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { new: true }
  )
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router