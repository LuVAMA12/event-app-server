import { Router } from "express";
import { getAllUsers, getUserByID, getUserProfile } from "../controllers/usersController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = Router()


userRouter.get('/profile',authMiddleware, getUserProfile)

userRouter.get('/users', getAllUsers)
userRouter.get('/user/:id', getUserByID)

export default userRouter