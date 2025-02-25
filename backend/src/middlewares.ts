import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

interface AuthPayload extends jwt.JwtPayload {
    id: string;
  }



export default function userMiddleware(req :Request ,res : Response,next :NextFunction){

    const header = req.headers["authorization"]
    const token = header?.split(" ")[1]

    try{

        const decoded = jwt.verify(token as string,process.env.JWT_SECRET as string) as AuthPayload
        if(decoded){
            req.userId = decoded.id 
            next();
        }else{
            res.status(403).json({
                message : "You are not logged in"
            })
        }

    }catch(e:any){
        res.status(500).json(e.message)
    }

}