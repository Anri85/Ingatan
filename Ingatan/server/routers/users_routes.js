const express = require('express');
const router = express.Router();

const { Login, Register } = require('../controllers/users_controllers');

router.route('/login').post(Login);
router.route('/register').post(Register);

module.exports = router;