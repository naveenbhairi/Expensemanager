const express = require("express");
const {
  registerUser,
  fetchUsersCtrl,
  loginUserCtrl,
  userProfileCtrl,
  updateUserCtrl,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMIddleware");

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.get("/profile", authMiddleware, userProfileCtrl);
userRoute.put("/update", authMiddleware, updateUserCtrl);
userRoute.post("/login", loginUserCtrl);
userRoute.get("/", authMiddleware, fetchUsersCtrl);
module.exports = userRoute;