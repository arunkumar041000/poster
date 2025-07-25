import { sessions } from "./auth"



export function authMiddleware(req,res,next){
    const token = req.headers["x-token"]
    if(token == null){
        return res.send({"message":"token not found"})
    }
    const user = sessions[token]
    if(user == null){
        return res.send({"message":"user not found"})
    }
    req.user = user
    next()
}