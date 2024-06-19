import {createHash} from "crypto";
import jwt from "jsonwebtoken";

export const hashPassword = (password) => {
    return createHash('sha256', process.env.CRYPTO_SECRET)
        .update(password)
        .digest('hex')
}

export const createTokenAndSetToCookie = async (user, res, req) => {
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})

    req.session.user = user
    req.session.token = token
    res.cookie('jwt', token)
}

export const verifyNameEmailPassword = (name, email, password) => {
    return (name && email && password) ? true : false
}