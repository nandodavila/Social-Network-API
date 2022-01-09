const { Thought, User } = require('../models');

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a Thought
  createThought(req, res) {
    Thought.create(req.body) 
      .then((thought) => {
        !thought
          ? res.status(404).json({message: 'Couldnt make thought, just input'})
          : User.findOneAndUpdate(
            {userId: req.body.userId},
            {$push: {thoughts: thought.thoughtName}},
            {runValidators: true, new: true },
          )
          .then((user) => 
              !user
                ?res.status(404).json({ message: 'No such user found'})
                : res.json({message: 'thought made'})
          )
          })
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
      
  },
  // Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ thoughtId: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : User.findOneAndUpdate(
            { username: thought.username },
            { $pull: {thoughts: req.params.thoughtId}},
            {runValidators: true, new: true }
          )
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { thoughtId: req.params.thoughtId },
      {
        thoughtName: req.body.thoughtName,
        username: req.body.username
      },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  addThoughtReaction(req, res) {
    Thought.findOneAndUpdate(
      { thoughtId: req.params.thoughtId },
      { $addToSet: {reactions: req.body} },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteThoughtReaction(req, res) {
    Thought.findOneAndUpdate(
      { thoughtId: req.params.thoughtId },
      { $pull: {reactions: {reactionId: req.params.reactionId}} },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        const response = !thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought);
        return response
      })
      .catch((err) => res.status(500).json(err));
  }, 
};
