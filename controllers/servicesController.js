import Service from "../models/Service.js"

export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find()
        if(services.length < 1) {
            return res.status(404).json('Services not found')
        }
        return res.status(200).json(services)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`Internal server error `)
    }
}

export const getServiceByID = async (req, res) => {
   const {id} = req.params
    try {
        const serviceByID = await Service.findById(id).populate('userID', '-password')
        if (!serviceByID) return res.status(404).json('Service not found')
        return res.status(200).json(serviceByID)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`Internal server error `)
    }
}

export const createService = async (req, res) => {

    const {title, description, price, category, address, availability} = req.body
    try {
        const newService = await Service.create({
            title,
            description,
            image: 'public/images/' + req.file.filename,
            price,
            category, 
            address, 
            availability,
            userID: req.user.id
        })
        if (newService) {
            return res.status(201).json({message:'New event created', newService})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(`Internal server error `)
    }
}

export const updateServiceByID = async (req, res) => {
    const {id} = req.params
    try {
        const updateService = await Service.findByIdAndUpdate(id,req.body)
        if(!updateService) return res.status(404).json('Service not found')
        if(updateService) return res.status(201).json('Service has been updated')
    } catch (error) {
        console.log(error)
        return res.status(500).json(`Internal server error `)
    }
}

export const deleteServiceByID = async (req, res) => {
    const {id} = req.params
    try {
        const deleteService = await Service.findByIdAndDelete(id)
        if(!deleteService) return res.status(404).json('Service not found')
        if(deleteService) return res.status(200).json('Service has been deleted')
    }catch (error) {
        console.log(error)
        return res.status(500).json(`Internal server error `)
    }
}