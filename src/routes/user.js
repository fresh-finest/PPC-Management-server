const express = require("express");

const { createUser, getAllUser, deleteUserById, updateUserById } = require("../controllers/userController")
const {authenticateUser, authorizeAdmin} = require('../middleware/authMiddleware')

const router  = express.Router();

router.route("/")
.post(createUser)
.get(authenticateUser,authorizeAdmin,getAllUser)

router.route("/:id").delete(deleteUserById).put(updateUserById);


module.exports = router;