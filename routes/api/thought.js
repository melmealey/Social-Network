const router = require('express').Router()
const { thought } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const result = await thought.find({});
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await thought.find({ _id: req.params.id });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/', async (req, res) => {
    const thoughtData = req.body;
  
    try {
      const newThought = await thought.create(thoughtData);
      res.status(201).json(newThought);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

router.put('/:id', async (req, res) => {
  try {
    const result = await thought.updateOne({ _id: req.params.id }, req.body)
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await thought.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(result);
    console.log(`Deleted: ${result}`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


router.post('/:thoughtId/reactions', (req, res) => {
  console.log(req)
  thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id' });
        return;
      }
      res.status(200).json({ message: dbThoughtData});
    })
    .catch((err) => res.status(400).json(err));
});


router.delete('/:thoughtId/reactions/:reactionId', (req, res) => {
  console.log(req.params)
  thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },    
    { runValidators: true, new: true }
  )
    .then((dbthoughtData) => {
      if (!dbthoughtData) {
        res.status(404).json({ message: 'No thought found with this id' });
        return;
      }
      res.json(dbthoughtData);
    })
    .catch((err) => res.status(400).json(err));
});



module.exports = router