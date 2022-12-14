
const express = require("express");
const { redirect } = require("express/lib/response");
const passport = require('passport');
const { isUserAuthenticated } = require("../modules/auth/auth.mdw");

const router = express.Router();
const { createAccount, loginGoogle, loginDefault, logout } = require("../modules/auth/authController");
const { getUserInfo } = require("../modules/user/userController")

const failURL = `${process.env.CLIENT_DOMAIN}/login`;

router.post("/sign-up", async (req, res, next) => {
  await createAccount(req, res);
})

router.post("/login", async (req, res) => {
  await loginDefault(req, res);
})
router.post("/logout", async (req, res) => {
  await logout(req, res);
})
router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: failURL, failureMessage: true }),
  async (req, res) => { await loginGoogle(req, res) }
);

router.get('/user-info', isUserAuthenticated, async (req, res) => {
  await getUserInfo(req, res);
})
router.get('/auth/user', isUserAuthenticated, async (req, res) => {
  res.send("ok")
})
module.exports = router;
