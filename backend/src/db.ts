import mongoose, { mongo } from "mongoose"
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URL as string).then(()=>{
    console.log("Database Connected");
})

const UsersSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,        
        unique : true,
        trim : true,
        lowercase : true,
        minLength : 3,
        maxLength : 30 
    },
    password : {
        type : String,
        minLength : 3,
        required : true 
    },
    name : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    }

})

const contentTypes = ['image', 'video', 'article', 'audio'];

const ContentSchema = new mongoose.Schema({
    
    link :{
        type: String,
        trim: true
    },

    type :{
        type : String,
        enum : contentTypes,
        required : true 
    },

    title : {
        type : String,
        required : true
    },

    tags : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Tags'
    }],

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required : true
    //     validate: async function(value: mongoose.Types.ObjectId | String) {
    //         const user = await Users.findById(value);
    //         if (!user) {
    //           throw new Error('User does not exist');
    //         }
    //       }
    }

})

const TagsSchema = new mongoose.Schema({
    
    title : {
        type : String,
        required : true,
        unique : true,
    }
})

const LinkSchema = new mongoose.Schema({

    hash : {
        type : String,
        required : true
    },

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required : true,
    }
})

export const Users = mongoose.model('Users',UsersSchema);
export const Content = mongoose.model('Content', ContentSchema);
export const Tags = mongoose.model('Tags',TagsSchema);
export const Link = mongoose.model('Link', LinkSchema);

