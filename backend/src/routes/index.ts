import express, { Router } from "express"
import { signinSchema, signupSchema } from "../zod/zod";
import { Content, Tags, Users } from "../db";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import userMiddleware from "../middlewares";
import { NextFunction, Request, Response } from "express";


async function populatingTagDb(){
    await Tags.create({
        title: "history"
    })
    
    await Tags.create({
        title: "productivity"
    })
    
    await Tags.create({
        title: "web dev"
    })
    console.log("Done")
}

// populatingTagDb()


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



router.post("/content",userMiddleware, async(req:Request ,res : Response) =>{
    const body = req.body;

    const title = body.title;
    const link = body.link;
    const type = body.type;
    const tags = body.tags;
    const userId = req.userId

    const tagsArray = await Tags.find({
        title: { $in: tags.map((name:any) => new RegExp(`^${name}$`, 'i')) } // Case-insensitive regex
    }).select('_id');

    const content = await Content.create({
        type,
        title,
        userId,
        link,
        tags : tagsArray
    })


    if(content){
        res.json({
            message : "Content added"
        })
    }else{
        res.status(ResponseStatus.ServerError).json({
            message : "Error Occured"
        })
    }
    
})

router.get("/content",userMiddleware,async(req,res)=>{
    
    const userId = req.userId;

 const contents = await Content.find({
        userId
    }).populate("tags")

    res.json({
        content : contents
    })
})


router.delete("/content",userMiddleware, async(req,res)=>{

    const contentId = req.body.contentId;
    const userId = req.userId;

try{
    
    const content = await Content.findById(contentId);

    if(!content){

        res.status(ResponseStatus.InputError).json({
            message : "Content not found"
        })
        return
    }


    if(content?.userId.toString() == userId){

        const del = await Content.findByIdAndDelete(contentId)

        if(!del){
            res.status(ResponseStatus.InputError).json({
                message : "Content not found"
            })
            return
        }
        
        res.json({
            message : "Content deleted Successfully."
        })

    }else{
        res.status(403).json({
            message : "You donot have the rights to delete this content."
        })
    }

}catch(e:any){
   
    res.status(ResponseStatus.ServerError).json(
        e.message
    )
    return
}
   


})

export default router;


