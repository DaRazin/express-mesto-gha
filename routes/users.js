const router = require('express').Router();

const {
  getUsers, getUser, getMyProfile, updateUserData, updateUserAvatar,
} = require('../controllers/users');

const { validUserId, validUserUpdate, validUserAvatarUpdate } = require('../middlewares/validator');

router.get('/users', getUsers);
router.get('/users/me', getMyProfile);
router.get('/users/:userId', validUserId, getUser);
router.patch('/users/me', validUserUpdate, updateUserData);
router.patch('/users/me/avatar', validUserAvatarUpdate, updateUserAvatar);

module.exports = router;
