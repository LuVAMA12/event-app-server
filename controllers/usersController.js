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