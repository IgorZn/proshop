import {createHash} from "crypto";
import jwt from "jsonwebtoken";

export const hashPassword = (password) => {
    return createHash('sha256', process.env.CRYPTO_SECRET)
        .update(password)
        .digest('hex')
}

export const createTokenAndSetToCookie = (user, res, req) => {
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})

    res.user = user
    req.session.token = token
    res.cookie('jwt', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        domain: 'localhost:5173',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    })

}

export const verifyNameEmailPassword = (name, email, password) => {
    return (name && email && password) ? true : false
}