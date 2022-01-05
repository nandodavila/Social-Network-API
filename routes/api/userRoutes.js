const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addThought,
  removeThought,
} = require('../../controllers/UserController');

// /api/Users
router.route('/').get(getUsers).post(createUser);

// /api/Users/:UserId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/Users/:UserId/Thoughts
router.route('/:userId/thoughts').post(addThought);

// /api/Users/:UserId/Thoughts/:ThoughtId
router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

module.exports = router;
