const router = require('express').Router();

const {
  getUsers, getUser, createUser, updateUserData, updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
router.patch('/users/me', updateUserData);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
