
const express = require("express");
const { redirect } = require("express/lib/response");
const passport = require('passport');
const { isUserAuthenticated } = require("../modules/auth/auth.mdw");

const router = express.Router();
const { createAccount, loginGoogle, loginDefault, logout, changePassword, resetPassword } = require("../modules/auth/authController");
const { getUserInfo, activeAccount, generateResetPwdUrl } = require("../modules/user/userController");
const { findUserByEmail } = require("../modules/user/userModel");


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
router.post('/forgot-password', async (req, res) => {
  //return with URL + id
  await generateResetPwdUrl(req, res);
})
router.post('/reset-password', async (req, res) => {
  try {

    await resetPassword(req, res)
  }
  catch (e) {
    res.status(400).send({ success: false, message: "invalid data" });
  }
})
router.post('/change-password', isUserAuthenticated, async (req, res) => {
  await changePassword(req, res);

})
module.exports = router;
