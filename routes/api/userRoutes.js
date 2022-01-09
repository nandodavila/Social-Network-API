const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addUserFriend,
  deleteUserFriend,
  // addThought,
  // removeThought,
} = require('../../controllers/UserController');

// /api/Users
router.route('/').get(getUsers).post(createUser);

// /api/Users/:UserId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

router.route(`/:userId/friends/:friendId`).put(addUserFriend).delete(deleteUserFriend)

module.exports = router;
