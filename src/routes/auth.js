const express = require("express");


const { signin, forgetPassword, resetPassword, setPassword } =require('../controllers/authController');


const router = express.Router();

router.post("/signin",signin);
router.post('/forget-password',forgetPassword);
router.get('/reset-password/:token',resetPassword);
router.post('/set-password/:token',setPassword);


module.exports = router;