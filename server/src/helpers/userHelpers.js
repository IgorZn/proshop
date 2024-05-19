import {createHash} from "crypto";
import jwt from "jsonwebtoken";

export const hashPassword = (password) => {
    return createHash('sha256', process.env.CRYPTO_SECRET)
        .update(password)
        .digest('hex')
}

export const createTokenAndSetToCookie = (user, res) => {
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})

    res.user = user
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })
}

export const verifyNameEmailPassword = (name, email, password) => {
    return (name && email && password) ? true : false
}