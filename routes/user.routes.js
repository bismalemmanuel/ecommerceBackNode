const { Router } = require('express');
const { check } = require('express-validator');
const {
  updateUser,
  deleteUser,
  findUsers,
  findUser,
  updatePassword,
  getOrders,
  getOrder,
} = require('../controllers/users.controller');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const { validIfExistUser } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', findUsers);

router.get('/id/:id', validIfExistUser, findUser);

router.use(protect);

router.get('/orders',protect, getOrders);
router.get('/orders/:id',protect, getOrder);


router.patch(
  '/:id',
  [
    check('username', 'The username must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    validateFields,
    validIfExistUser,
    protectAccountOwner,
  ],
  updateUser
);

router.patch(
  '/password/:id',
  [
    check('currentPassword', 'The current password must be mandatory')
      .not()
      .isEmpty(),
    check('newPassword', 'The new password must be mandatory').not().isEmpty(),
    validateFields,
    validIfExistUser,
    protectAccountOwner,
  ],
  updatePassword
);

router.delete('/:id', validIfExistUser, protectAccountOwner, deleteUser);


module.exports = {
  usersRouter: router,
};
