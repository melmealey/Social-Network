const router = require('express').Router()
// const db = require('../../config/connection')
const { thought } = require('../../models')

router.get('/', async (req, res) => {
    try {
      const result = await thought.find({});
      res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

router.get('/:id', async (req, res) => {
    try {
      const result = await thought.find({_id: req.params.id});
      res.status(200).json(result);
    } catch (err) {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

router.post('/', (req, res) => {
  const newThought = new thought ({ title: req.body.title, body: req.body.body });
  // console.log(req.body)
  newThought.save();
  if (newThought) {
    res.status(201).json(newThought);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.delete('/delete-post/:id', async (req, res) => {
    try {
        const result = await Post.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } catch (err) {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    });

router.put('/update-post/:id', async (req, res) => {
        try {
        const result = await Post.updateOne({ _id: req.params.id }, req.body)
        res.status(200).json(result)
        } catch (err) {
            res.status(500).json({error: 'Something went wrong'})
        }
    })

module.exports = router