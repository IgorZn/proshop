import mongoose from "mongoose";
import {hashPassword} from "../../helpers/userHelpers.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true})


userSchema.methods.matchPassword = function (enteredPassword) {
    return this.password === hashPassword(enteredPassword)
}

export const User = mongoose.model('User', userSchema)