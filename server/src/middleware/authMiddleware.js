import jwt from "jsonwebtoken";
import {User} from "../schemas/mongo/user.mongo.js";


export const protectedRoute = (req, res, next) => {
    const cookieToken = req?.cookies.jwt
    if (cookieToken) {
        jwt.verify(cookieToken, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.redirect('/login')
            } else {
                // Add user info to req.user
                req.user = await User.findById(decodedToken.id).select('-password')
                next()
            }
        })
    } else {
        res.status(401).json({message: 'Unauthorized'})
    }
}

export const adminRoute = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).json({message: 'Unauthorized'})
    }
}