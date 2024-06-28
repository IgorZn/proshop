import express from "express";
import {uploadController} from "./upload.controller.js";
import {protectedRoute} from "../../middleware/authMiddleware.js";

export const uploadRouter = express.Router();


uploadRouter.post('/', protectedRoute, uploadController)