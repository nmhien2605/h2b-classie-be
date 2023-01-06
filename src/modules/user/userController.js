import res from "express/lib/response";
import { sendVerificationMail, sendResetPasswordMail } from "../../services/email";
import { findUserByEmail, findUserById } from "./userModel";

const { decodeToken } = require("../auth/authController");
const { updateUserInfo } = require("./userModel");

export const getUserInfo = async (req, res) => {
    const user = await findUserById(req.cookies.id);
    if (!user) {
        return res.status(401).send({ message: "User không tồn tại", success: false });
    }
    const { password: _, ...userInfo } = user.toObject();
    return res.status(200).send({ message: "get user info success", user: userInfo, success: true });
}
export const generateVerificationMail = async (req, res) => {
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
}
export const activeAccount = async (req, res) => {
    try {
        console.log(req.params);
        const id = req.params.userId;
        const userInfo = await findUserById(id);
        if (userInfo.isActive === false) {
            await updateUserInfo({ _id: id, isActive: true }, {
                success: (user) => {
                    console.log(user);
                    res.status(200).send({ message: "active account thanh cong" });
                },
                error: (err) => {
                    console.log(err);
                    res.status(400).send({ message: "active account that bai" });
                }
            })
        }
        else {
            res.status(201).send({ message: "account da duoc active" });
        }
    }
    catch (e) {
        res.status(400).send({ message: "invalid data" });
    }
}
export const generateResetPwdUrl = async (req, res) => {
    const clientDomain = req.get("origin") ? req.get("origin") : req.get("referer");
    const { email } = req.body;
    const user = await findUserByEmail(email)
    if (user) {
        const resetPasswordUrl = clientDomain + `/reset-password/${user._id}`;
        // send email
        if (user.isActive === true) {
            await sendResetPasswordMail([email], resetPasswordUrl,
                {
                    success: (info) => {
                        console.log("done");
                        return res
                            .status(200)
                            .send({ success: true, message: "Yêu cầu reset mật khẩu đã được gửi về email của bạn." })
                    },
                    error: (error) => {
                        console.log(error);
                        return res
                            .status(500)
                            .json({ success: false, message: "Email fail to send" });
                    },
                });
        }
        else {
            res.status(400).send({ success: false, message: "account chua duoc active" });
        }

    }

}
