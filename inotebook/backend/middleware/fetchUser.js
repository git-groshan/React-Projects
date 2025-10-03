const jwt = require("jsonwebtoken");
const JWT_SECRET = "ThisIsJWTSecretCode"; // eg- const secret = 'your-256-bit-secret';

const fetchUsers =  (req,res,next)=>{
// Get the user from the jwt token and add id to req object 
    const token = req.header("auth-token");

    if(!token){
        res.status(401).send({error:"Invalid token !! Please autheticate using a valid token"})
    }
    try {
        const data =  jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next(); // this denotes that middleware work is over now the next function will be called which is (req,res)=>{} in the route 
    } catch (error) {
        res.status(401).send({error:"Please autheticate using a valid token"})
        
    }



}

module.exports = fetchUsers
