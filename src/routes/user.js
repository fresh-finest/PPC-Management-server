const express = require("express");

const { createUser, getAllUser, deleteUserById, updateUserById } = require("../controllers/userController")

const router  = express.Router();

router.route("/")
.post(createUser)
.get(getAllUser)

router.route("/:id").delete(deleteUserById).put(updateUserById);


module.exports = router;