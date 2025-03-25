import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET

export const authMiddleware = async (req, res, next) => {
    console.log(`Middleware to verify if the user is loggedIn`)
    const token = req.headers.authorization?.split(' ') [1]

    if(!token) {
        return res.status(401).json('Access refused: no token provided')
    }
    try {
      const verify = await jwt.verify(token,JWT_SECRET)
      if(!verify) {
        return res.status(403).json(`Access denied, wrong token`)
    }
    req.user = verify
    next()
    } catch (error) {
        console.log(error)
        return res.status(500).json(`Internal server error `) 
    }
}

// export const verifyUser = async (req, res, next) => {
//     console.log(`Middleware to verify if the user is loggedIn`)
//     const authorization = req.headers.authorization
//     if(!authorization) {
//         return res.status(405).json(`No authorization provided`)
//     }
//     try {
//        if(authorization !== `Test`) {
//         return res.status(405).json('Wrong authorisation, access denied')
//        }
//        next()
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json(`Internal server error `) 
//     }
// }