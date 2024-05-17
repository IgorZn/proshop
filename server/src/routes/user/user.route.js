import express from "express";
import {
    deleteUser,
    getUserById,
    getUserProfile,
    getUsers,
    loginUser,
    logoutUser,
    registerUser, updateUserById, updateUserProfile
} from "./user.controller.js";

export const userRouter = express.Router();

userRouter.get("/", getUsers)
userRouter.post("/", registerUser)

// auth
userRouter.post("/login", loginUser)
userRouter.post("/logout", logoutUser)

// profile
userRouter.get("/profile", getUserProfile)
userRouter.put("/profile", updateUserProfile)

// by Id
userRouter.get("/:id", getUserById)
userRouter.delete("/:id", deleteUser)
userRouter.put("/:id", updateUserById)
