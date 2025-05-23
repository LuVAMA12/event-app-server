import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const JWT_SECRET = process.env.JWT_SECRET


export const createUser = async (req, res) => {
    const {first_name, last_name, email, password} = req.body
    try {
        // We search in our DB where the email could match the req.body.email (the email given by the user)
        const emailVerification = await User.findOne({email})
        if(emailVerification) {
            return res.status(409).json(`Email already taken`)
        }
        const saltPassword = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltPassword)

        const newUser = await new User({
            first_name,
            last_name,
            email,
            password : hashedPassword,
            image: 'public/images/' + req.file.filename
        })

        newUser.save()
        return res.status(201).json(`Welcome to event manager ${first_name}`)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`Internal server error `)
    }
}

export const loginUser = async (req, res) => {
    // We destructured the req.body form
    const {email, password} = req.body
    try {
        // We search in the DB where the user email match the email provide by req.body.email
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json(`Email or password invalid`)
        }
        // We compare the password hash value given by the req.body.password with the user.password hashed value
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(401).json(`Email or password invalid`) 
        }
        const token = await jwt.sign({id: user._id}, JWT_SECRET)
        return res.status(200).json({message: `Welcome to ${user.first_name}`, token})
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json(`Internal server error `)
    }
}