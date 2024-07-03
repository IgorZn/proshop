import {User} from "../../schemas/mongo/user.mongo.js";
import {createTokenAndSetToCookie, verifyNameEmailPassword} from "../../helpers/userHelpers.js";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
    const {name, login, password} = req.body

    // Validation
    if (!verifyNameEmailPassword(name, login, password)) {
        return res
            .status(400)
            .json({message: 'Invalid name, email or password'})
    }

    const userExists = await User.findOne({email: login})
    if (userExists) {
        return res
            .status(400)
            .json({message: 'User already exists'})
    }

    const user = await User.create({name, email: login, password})

    await createTokenAndSetToCookie(user, res)

    return res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
}

export const logoutUser = (req, res) => {
    delete res.user
    res.clearCookie('jwt')
    res.clearCookie('connect.sid')
    res.status(200).json({message: 'User logged out'})
}

export const loginUser = async (req, res) => {
    const loginUser = await User.findOne({email: req.body.login})
    const isMatch = loginUser ? await loginUser.matchPassword(req.body.password) : false

    if (loginUser && isMatch) {
        // await createTokenAndSetToCookie(loginUser, res, req)
        const token = jwt.sign({id: loginUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'})

        req.session.user = loginUser
        req.session.token = token
        res.cookie('jwt', token)

        console.log('req.sessionOptions>>>', req.session)

        return res
            .status(201)
            .json({
                _id: loginUser.id,
                name: loginUser.name,
                email: loginUser.email,
                isAdmin: loginUser.isAdmin,
                token: req.session.token,
                sid: req.session.id
            })
    } else {
        return res
            .status(404)
            .json({message: 'Invalid email or password'})
    }

}

export const getUserProfile = async (req, res) => {
    await User.findById(req.user._id)
        .then(user => {
            if (user) {
                res.status(200).json({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                })
            } else {
                res.status(404).json({message: 'User not found'})
            }
        })
        .catch(err => {
            res.status(404).json({message: err.message})
        })
}

export const updateUserProfile = async (req, res) => {
    console.log('updateUserProfile>>>', req.body)
    if (req.body.password.length > 0) {
        req.body.password = hashPassword(req.body.password)
    } else {
        delete req.body.password
    }

    req.body.name = req.body.name || req.user.name
    req.body.email = req.body.email || req.user.email

    await User.findByIdAndUpdate(req.body._id, {$set: req.body}, {new: true})
        .then(user => {
            if (user) {
                res.status(200).json({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                })
            } else {
                res.status(401).json({message: 'User not found'})
            }

        })
        .catch(err => {
            res.status(404).json({message: err.message})
        })
}

export const getUsers = async (req, res) => {
    const currentUserName = req.session.user.name
    const users = await User.find({name: {$ne: currentUserName}})

    if (users) {
        res.status(200).json({status: true, count: users.length, users})
    } else {
        res.status(404).json({status: false, message: 'Users not found'})
    }
}

export const getUserById = async (req, res) => {
    const {id} = req.params
    await User.findById(id)
        .select('-password')
        .then(user => {
            if (user) {
                res.status(200).json({status: true, user})
            } else {
                res.status(404).json({status: false, message: 'User not found'})
            }
        })
        .catch(err => {
            res.status(404).json({status: false, message: err.message})
        })
}

export const deleteUser = async (req, res) => {
    const {id} = req.params
    await User.findByIdAndDelete(id)
        .then(user => {
            if (user.isAdmin) return res.status(403).json({status: false, message: 'Admin cannot be deleted'})

            if (user) {
                res.status(200).json({status: true, user})
            } else {
                res.status(404).json({status: false, message: 'User not found'})
            }
        })
        .catch(err => {
            res.status(404).json({status: false, message: err.message})
        })
}

export const updateUserById = async (req, res) => {
    const {id} = req.params
    await User.findByIdAndUpdate(id, {$set: req.body}, {new: true})
        .then(user => {
            if (user) {
                res.status(200).json({status: true, user})
            } else {
                res.status(404).json({status: false, message: 'User not found'})
            }
        })
        .catch(err => {
            res.status(404).json({status: false, message: err.message})
        })
}

export const checkToken = (req, res) => {
    const {token} = req.body
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(200).json({status: false, message: 'Invalid token'})
        } else {
            res.status(200).json({status: true, message: 'Token is valid'})
        }
    })
}