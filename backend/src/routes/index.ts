import express, { Router } from "express"
import { signinSchema, signupSchema } from "../zod/zod";
import { Users } from "../db";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const router = Router()

enum ResponseStatus {
    Success = 200,
    InputError = 411,
    UserExist = 403,
    ServerError = 500
}

router.post('/signup',async (req,res) => {
    const body = req.body
    const result = signupSchema.safeParse(body);

    if(!result.success){
        console.log(result)
         res.status(ResponseStatus.InputError).json(result.error.issues[0].message)
         return
    }

    const existingUser = await Users.findOne({
        username : body.username
    }) 

    if(existingUser){
        res.status(ResponseStatus.UserExist).json({
            message : "User with this username already exist"
        })
        return
    }

    const username = body.username;
    const password = body.password;
    const name = body.name;

    const hashedpassword = await bcrypt.hash(password,5)

    try{
        const user = await Users.create({
            username,
            password: hashedpassword,
            name
        })
    
        if(!user){
            res.status(ResponseStatus.ServerError).json({
                message : "Error Occured. Try Again"
            })
            return
        }
    
        res.json({
            message : "Account created successfully",
            
        })

    }catch(e){
        res.status(ResponseStatus.ServerError).json({
            message : "Error Occured. Try Again"
        })
    }

})


router.post("/signin",async (req,res)=>{
    const body = req.body;

    const result = signinSchema.safeParse(body)

    if(!result.success){
        res.status(ResponseStatus.InputError).json({
            message : "Invalid Email or Password"
        })
        return
    }

    const response = await Users.findOne({
        username : body.username
    })

    if(!response){
        res.status(ResponseStatus.InputError).json({
            message : "User does not exist"
        })
        return
    }else{
    
        const passwordMatch = await bcrypt.compare(body.password,response.password)

        if(passwordMatch){
            
                const userId = response._id;

                const token = jwt.sign({
                id : userId.toString(),
                username : response.username,
                },process.env.JWT_SECRET as string)

                res.json({
                    message : "Signed in Successfully",
                    token
                })

        }else{
            res.status(ResponseStatus.InputError).json({
                message : "Invalid Email or Password"
            })
            }   
    }
    
})


export default router;


