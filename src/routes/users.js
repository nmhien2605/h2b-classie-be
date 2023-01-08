const express = require("express");
const { isUserAuthenticated } = require("../modules/auth/auth.mdw");
const { activeAccount, getUserInfo, generateVerificationMail } = require("../modules/user/userController");
const { findUserById } = require("../modules/user/userModel");
const { sendVerificationMail } = require("../services/email");
const emailTemplate = require("../utils/emailTemplate");


const router = express.Router();

/* GET users listing. */
router.get("/", isUserAuthenticated, async (req, res) => {
  getUserInfo(req, res);
});
router.get("/", (req, res, next) => {
  console.log(req.body);
})
// 
router.get("/verify/:userId", async (req, res) => {
  await activeAccount(req, res);
})
// send email
router.get('/active-account', isUserAuthenticated, async (req, res) => {
  // create active URL
  await generateVerificationMail(req, res);
})

module.exports = router;
