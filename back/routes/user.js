const express = require('express');
const router = express.Router();


const {createUser,login,logout} = require('../controllers/index')


router.route('/register').post( createUser);
router.route('/login').post(login);
router.route("/logout").post(logout)
module.exports = router

//MVC = model view controller