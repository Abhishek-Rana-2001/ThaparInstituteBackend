const express = require("express");

const router = express.Router()
const User = require("../models/userModel");
const { RegisterUser, LoginUser } = require("../controllers/userController");


router.post("/signup" , RegisterUser)
router.post("/login" , LoginUser)

module.exports = router