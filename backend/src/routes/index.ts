import express, { Router } from "express"
import { signinSchema, signupSchema } from "../zod/zod";
import { Content, Link, Tags, Users } from "../db";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import userMiddleware from "../middlewares";
import { NextFunction, Request, Response } from "express";
import hashify from "../utilis";


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

    const username = body.username;
    const password = body.password;
    const name = body.name;

    const result = signupSchema.safeParse({
        username,
        password,
        name
    });

    if(!result.success){
         res.status(ResponseStatus.InputError).json({
            path : result.error.issues[0].path,
            reason : result.error.issues[0].message
         })
         return
    }

    const existingUser = await Users.findOne({
        username 
    }) 

    if(existingUser){
        res.status(ResponseStatus.UserExist).json({
            message : "User with this username already exist"
        })
        return
    }



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

    const username = body.username;
    const password = body.password;

    const result = signinSchema.safeParse({
        username,
        password
    })

    if(!result.success){
        res.status(ResponseStatus.InputError).json({
            message : "Invalid Email or Password"
        })
        return
    }

    const response = await Users.findOne({
        username 
    })

    if(!response){
        res.status(ResponseStatus.InputError).json({
            message : "User does not exist"
        })
        return
    }else{
    
        const passwordMatch = await bcrypt.compare(password,response.password)

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
    }).populate("tags","title")

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


router.post("/brain/sharebrain", userMiddleware, async(req,res)=>{

    const share = req.body.share;

try{

    if(share){    

        const existingLink = await Link.findOne({
            userId : req.userId
        })
    
        if(existingLink){    
            res.json({
                message : "Your Second brain is public.",
                link : "/share/" + existingLink.hash
            })
            return;
        }

    const link = await Link.create({
                    userId : req.userId,
                    hash : hashify(15)
                })

        res.json({
            message : "Your Second brain is now public.",
            link : "/share/" + link.hash
        })
        return

    }else{
        await Link.deleteOne({
            userId : req.userId
        })

        res.json({
            message : "Your Second brain is now private.",
        })
        return

    }
}catch(e:any){
   
    res.status(ResponseStatus.ServerError).json(
        e.message
    )
    return
}
})

router.get("/brain/share/check",userMiddleware,async(req,res)=>{

    const check = await Link.findOne({
        userId : req.userId
    })

    if(check){    
        res.json({
            message : "Your Second brain is public.",
            link : check.hash
        })
        return;
    }else{
        res.json({
            message : "Your Second brain is private.",
        })
        return;
    }
})

router.get("/brain/share/:sharelink",async(req,res)=>{

    const shareLink = req.params.sharelink;

    const link = await Link.findOne({
        hash : shareLink
    })

    if(!link){
        res.status(ResponseStatus.InputError).json({
            message : "No second brain of this link exist."
        })
        return
    }

    const content = await Content.findOne({
        userId : link.userId
    })

    const user = await Users.findOne({
        _id : link.userId
    })

    res.json({
        //@ts-ignore
        username : user.username,
         //@ts-ignore
        content : content
    })



})

export default router;


