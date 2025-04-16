import { Router } from "express";
import { getAllUsers, getUserByID, getUserProfile, updateUserByID } from "../controllers/usersController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadFile.js";

const userRouter = Router()


userRouter.get('/profile',authMiddleware, getUserProfile)
userRouter.put('/userUpdate',authMiddleware, upload.single('image'), updateUserByID)

userRouter.get('/users', getAllUsers)
userRouter.get('/user/:id', getUserByID)

export default userRouter