const router = require('express')
  .Router();
const {
  updateProfile,
  getMe,
} = require('../cotrollers/userController');
const {
  celebrateUpdateUser,
} = require('../celebrate/celebrateUser');

router.get('/me', getMe);
router.patch('/me', celebrateUpdateUser, updateProfile);
module.exports = router;
