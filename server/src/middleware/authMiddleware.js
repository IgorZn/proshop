import jwt from "jsonwebtoken";
import {User} from "../schemas/mongo/user.mongo.js";


export const protectedRoute = (req, res, next, skip= false) => {
    skip && next()

    // Check for cookie
    const cookieToken = req?.headers?.authorization?.split('Bearer ')[1]

    if (cookieToken) {
        jwt.verify(cookieToken, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.redirect('http://localhost:5173/login')
            } else {
                // Add user info to req.user
                req.user = await User.findById(decodedToken.id).select('-password')
                next()
            }
        })
    } else {
        console.log('Unauthorized')
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