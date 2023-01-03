import res from "express/lib/response";
import { findUserByEmail, findUserById } from "./userModel";

const { decodeToken } = require("../auth/authController");
const { updateUserInfo } = require("./userModel");

export const getUserInfo = async (req, res) => {
    const user = await findUserById(req.cookies.id);
    if (!user) {
        return res.status(401).send({ message: "User không tồn tại" });
    }
    const { password: _, ...userInfo } = user.toObject();
    return res.status(200).send({ message: "get user info success", user: userInfo });
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

