import express from "express";
import {
    checkToken,
    deleteUser,
    getUserById,
    getUserProfile,
    getUsers,
    loginUser,
    logoutUser,
    registerUser, updateUserById, updateUserProfile
} from "./user.controller.js";
import {adminRoute, protectedRoute} from "../../middleware/authMiddleware.js";

export const userRouter = express.Router();

userRouter.get("/", protectedRoute, adminRoute, getUsers)
userRouter.post("/", registerUser)

// auth
userRouter.post("/login", loginUser)
userRouter.post("/logout", logoutUser)

// profile
userRouter.get("/profile", protectedRoute, getUserProfile)
userRouter.put("/profile", updateUserProfile)

// by Id
userRouter.get("/:id", protectedRoute, getUserById)
userRouter.delete("/:id", protectedRoute, deleteUser)
userRouter.put("/:id", protectedRoute, updateUserById)

// Token check
userRouter.post("/check-token", checkToken)
