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
    Thought.findOne({ _id: req.params.ThoughtId })
      .select('-__v')
      .then((thought) =>
        !Thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a Thought
  createThought(req, res) {
    Thought.create(req.body) 
      .then((thought) => 
        !thought
          ? res.status(404).json({message: 'Couldnt make thought, just input})
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
      )
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
      
  },
  // Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
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
      { _id: req.params.ThoughtId },
      { $set: req.body },
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
      { _id: req.params.ThoughtId },
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
      { _id: req.params.ThoughtId },
      { $pull: {reactionId: req.params.reactionId} },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  
  
};




  // // Add an thought to a user
  // addThought(req, res) {
  //   console.log('You are adding an thought');
  //   console.log(req.body);
  //   User.findOneAndUpdate(
  //     { _id: req.params.userId },
  //     { $addToSet: { thoughts: req.body } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((user) =>
  //       !user
  //         ? res
  //             .status(404)
  //             .json({ message: 'No user found with that ID :(' })
  //         : res.json(user)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
  // // Remove thought from a user
  // removeThought(req, res) {
  //   User.findOneAndUpdate(
  //     { _id: req.params.userId },
  //     { $pull: { thought: { thoughtId: req.params.thoughtId } } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((user) =>
  //       !user
  //         ? res
  //             .status(404)
  //             .json({ message: 'No user found with that ID :(' })
  //         : res.json(user)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },