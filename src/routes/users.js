const express = require("express");
const { isUserAuthenticated } = require("../modules/auth/auth.mdw");
const { activeAccount, getUserInfo } = require("../modules/user/userController");
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
  const clientDomain = req.get("origin") ? req.get("origin") : req.get("referer");

  const verifyUrl = clientDomain + `/verify/${req.id}`;;
  // send email
  await sendVerificationMail([req.email], verifyUrl,
    {
      success: (info) => {
        return res
          .status(200)
          .send({ success: true, message: "Email sent succesfully" })
      },
      error: (error) => {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, message: "Email fail to send" });
      },
    });
})
router.post('/forgot-password/:email', async (req, res) => {

})
router.post('/change-password', async (req, res) => {

})
module.exports = router;
