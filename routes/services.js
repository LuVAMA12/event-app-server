import { Router } from "express";
import { createService, deleteServiceByID, getAllServices, getServiceByID, updateServiceByID } from "../controllers/servicesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadFile.js";

const servicesRouter  = Router()

servicesRouter.get('/services', getAllServices )
servicesRouter.get('/service/:id', getServiceByID )
servicesRouter.post('/services',authMiddleware, upload.single('image'), createService)
servicesRouter.put('/services/:id',authMiddleware, updateServiceByID)
servicesRouter.delete('/services/:id',authMiddleware, deleteServiceByID)

export default servicesRouter