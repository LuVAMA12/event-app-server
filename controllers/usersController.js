import User from "../models/User.js"

export const getUserProfile = async (req, res) => {
    const {id} = req.user
    console.log(id)
    try {
        const user = await User.findById(id).select('-password')
        console.log(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`Internal server error `)
    }
}