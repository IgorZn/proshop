import {User} from "../../schemas/mongo/user.mongo.js";
import jwt from 'jsonwebtoken'


export const registerUser = (req, res) => res.send('register user') // TODO: Register User

export const logoutUser = (req, res) => res.send('logout user')

export const loginUser = async (req, res) => {
    const loginUser = await User.findOne({email: req.body.login})
    const isMatch = loginUser ? await loginUser.matchPassword(req.body.password) : false

    if(loginUser && isMatch){
        const token = jwt.sign({
            id: loginUser._id},
            process.env.JWT_SECRET, {expiresIn: '1h'})

        // Set JWT in cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({
            _id: loginUser.id,
            name: loginUser.name,
            email: loginUser.email,
            isAdmin: loginUser.isAdmin,
        })
    } else {
        res
            .status(404)
            .json({ message: 'Invalid email or password' })
    }

}

export const getUserProfile = (req, res) => res.send('get userprofile')

export const updateUserProfile = (req, res) => res.send('update userprofile')

export const getUsers = (req, res) => res.send('get users')

export const getUserById = (req, res) => res.send('get user by id')

export const deleteUser = (req, res) => res.send('delete users')

export const updateUserById = (req, res) => res.send('update users')