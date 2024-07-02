const express = require("express");

const { createUser, getAllUser } = require("../controllers/userController")

const router  = express.Router();

router.route("/")
.post(createUser)
.get(getAllUser)


module.exports = router;