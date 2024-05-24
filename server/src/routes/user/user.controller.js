import {User} from "../../schemas/mongo/user.mongo.js";
import {createTokenAndSetToCookie, verifyNameEmailPassword} from "../../helpers/userHelpers.js";


export const registerUser = async (req, res) => {
    const {name, login, password} = req.body

    // Validation
    if(!verifyNameEmailPassword(name, login, password)){
        return res
            .status(400)
            .json({message: 'Invalid name, email or password'})
    }

    const userExists = await User.findOne({email: login})
    if(userExists){
        return res
            .status(400)
            .json({message: 'User already exists'})
    }

    const user = await User.create({name, email: login, password})

    createTokenAndSetToCookie(user, res)

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
    res.status(200).json({message: 'User logged out'})
}

export const loginUser = async (req, res) => {
    console.log(req.body)
    const loginUser = await User.findOne({email: req.body.login})
    const isMatch = loginUser ? await loginUser.matchPassword(req.body.password) : false

    if(loginUser && isMatch){
        createTokenAndSetToCookie(loginUser, res)

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

export const getUserProfile = async (req, res) => {
    await User.findById(req.user._id)
        .then(user => {
            if(user){
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
    if(req.body.password){
        req.body.password = hashPassword(req.body.password)
    }

    req.body.name = req.body.name || req.user.name
    req.body.email = req.body.email || req.user.email

    await User.findByIdAndUpdate(req.user._id, {$set: req.body}, {new: true})
        .then(user => {
            if(user){
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

export const getUsers = (req, res) => res.send('get users')

export const getUserById = (req, res) => res.send('get user by id')

export const deleteUser = (req, res) => res.send('delete users')

export const updateUserById = (req, res) => res.send('update users')