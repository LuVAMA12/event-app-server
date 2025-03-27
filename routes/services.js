import { Router } from "express";
import { createService, deleteServiceByID, getAllServices, getServiceByID, updateServiceByID } from "../controllers/servicesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const servicesRouter  = Router()

servicesRouter.get('/services', getAllServices )
servicesRouter.get('/services/:id', getServiceByID )
servicesRouter.post('/services',authMiddleware, createService)
servicesRouter.put('/services/:id',authMiddleware, updateServiceByID)
servicesRouter.delete('/services/:id',authMiddleware, deleteServiceByID)

export default servicesRouter