import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const eventRouter = Router()

eventRouter.get('/events', authMiddleware, (req, res) => {
        res.send('Welcome to my events ')
    
})

export default eventRouter