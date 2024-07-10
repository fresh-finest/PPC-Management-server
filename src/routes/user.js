const express = require("express");

const { createUser, getAllUser, deleteUserById, updateUserById,getUserByEmail} = require("../controllers/userController")
const {authenticateUser, authorizeAdmin} = require('../middleware/authMiddleware')

const router  = express.Router();

router.route("/")
.post(createUser)
.get(getAllUser)

router.route("/:id").delete(deleteUserById).put(updateUserById);
router.route("/:email").get(getUserByEmail);


module.exports = router;