import User from "../models/User.js"

export const getUserProfile = async (req, res) => {
    const {id} = req.user
    try {
        const user = await User.findById(id).select('-password')
        if(!user) return res.status(404).json('User not found')
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`Internal server error `)
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        if(!users) return res.status(404).json('User not found')
        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`Internal server error `)
    }
}

export const getUserByID = async (req, res) => {
    const {id} = req.params
    try {
        const userByID = await User.findById(id)
        if(!userByID) return res.status(404).json('User not found')
        return res.status(200).json(userByID)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`Internal server error `)
    }
}