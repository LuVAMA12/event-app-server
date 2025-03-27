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
        const service = await Service.findById(id)
        if (!service) return res.status(404).json('Service not found')
        return res.status(200).json(service)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`Internal server error `)
    }
}

export const createService = async (req, res) => {
    try {
        const newService = await Service.create(req.body)
        if (newService) {
            return res.status(201).json('New event created')
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