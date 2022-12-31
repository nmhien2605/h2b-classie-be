
import { createUser, findUserByEmail } from "../user/userModel";

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);
const bcrypt = require('bcrypt');
// const randToken = require('rand-token');
// const cookie = require('cookies');
const clientURL = `${process.env.CLIENT_DOMAIN}`;
const saltRounds = 10;
export const createAccount = async (req, res) => {

    const { name, email, password } = req.body;

    const user = await findUserByEmail(email, null)
    if (user) {
        res.status(405).send({ msg: 'Email tài khoản đã tồn tại.' });
        return;
    }
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const newUser = {
        name,
        email,
        password: hashedPassword,
        isActive: false,
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROdEaZteLTepbACoy3MjSfAsulnfciHnp4nw&usqp=CAU",
    }
    createUser(newUser, {
        success: async (user) => {
            console.log(user);
            const dataForAccessToken = {
                email: user.email,
                id: user._id
            };
            const accessToken = await generateAccessToken(dataForAccessToken);
            res.status(200).json({ success: true, accessToken, email: user.email })
        },
        error: (e) => {
            console.log(e);
            res
                .status(500)
                .json({ success: false, msg: "Create account fail!" });
        }
    })
};

export const generateToken = async (payload, secretSignature, tokenLife) => {
    try {
        return await sign(
            {
                payload,
            },
            secretSignature,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife * 60,
            },
        );
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
};
export const decodeToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey, {
            ignoreExpiration: false,
        });
    } catch (error) {
        console.log(`Error in decode access token: ${error}`);
        return null;
    }
};
export const generateAccessToken = async (dataForAccessToken) => {
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessToken = await generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife,
    );
    return accessToken
}
export const loginDefault = async (req, res) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(404).send({ msg: 'Tài khoản không tồn tại.' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(404).send({ msg: 'Mật khẩu không chính xác.' });
    }

    const dataForAccessToken = {
        email: user.email,
        id: user._id
    };
    const accessToken = await generateAccessToken(
        dataForAccessToken,
    );
    if (!accessToken) {
        return res
            .status(401)
            .send({ msg: 'Đăng nhập không thành công, vui lòng thử lại.' });
    }
    // let refreshToken = randToken.generate(jwtVariable.refreshTokenSize);
    // if (!user.refreshToken) {

    //     await userModel.updateRefreshToken(user.username, refreshToken);
    // } else {

    //     refreshToken = user.refreshToken;
    // }
    res.cookie('accessToken', accessToken);
    res.cookie('id', user._id);
    res.cookie('displayName', user.name ? user.name : user.email);
    res.cookie('email', user.email);
    return res.status(200).send({
        msg: 'Đăng nhập thành công.',
        // user: userInfo
    });
}
export const loginGoogle = async (req, res) => {

    const dataForAccessToken = {
        email: req.user.email,
        id: req.user._id
    };
    const accessToken = await generateAccessToken(
        dataForAccessToken,
    );
    if (!accessToken) {
        return res
            .status(401)
            .send({ msg: 'Đăng nhập không thành công, vui lòng thử lại.' });
    }

    res.cookie('accessToken', accessToken);
    res.cookie('id', req.user._id);
    res.cookie('displayName', req.user.name);
    res.cookie('email', req.user.email);

    return res.redirect(`${clientURL}/getinfo`);
}
export const logout = async (req, res) => {
    if (req.cookies) {
        res.clearCookie('accessToken');
        res.clearCookie('id');
        res.clearCookie('displayName');
        res.clearCookie('email');
    }
    return res.status(200).send({
        msg: "Logout thành công",
    });
}