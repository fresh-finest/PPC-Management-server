const express = require("express");


const { signin } =require('../controllers/authController');


const router = express.Router();

router.post("/",signin);

module.exports = router;