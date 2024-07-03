import jwt from "jsonwebtoken";
import {User} from "../schemas/mongo/user.mongo.js";
import {json} from "express";


export const protectedRoute = (req, res, next, skip= false) => {
    skip && next()

    // Check for cookie
    const cookieToken = req?.headers?.authorization?.split('Bearer ')[1]
    // console.log(req.headers)

    if (cookieToken) {
        jwt.verify(cookieToken, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.status(403).send({status: false, message: err.message})
            } else {
                // Add user info to req.user

                req.session.user = await User.findById(decodedToken.id).select('-password')
                next()
            }
        })
    } else {
        res.status(401).json({status: false, message: 'Unauthorized'})
    }
}

export const adminRoute = (req, res, next) => {
    const cookieToken = req?.headers?.authorization?.split('Bearer ')[1]
    const decoded = jwt.verify(cookieToken, process.env.JWT_SECRET);

    console.log('adminRoute>>>',req.session.user)
    console.log('adminRoute>>>',decoded)
    if (req.session.user && req.session.user.isAdmin) {
        next()
    } else {
        res.status(401).json({message: 'Unauthorized'})
    }
}