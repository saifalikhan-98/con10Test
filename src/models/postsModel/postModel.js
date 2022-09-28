import mongoose, { Schema } from "mongoose";

const PostModelSchema=new Schema({

    username:{
        type:String,
        required:[true, 'username is required']
    },
    caption:{
        type:String,
        default:''
    },
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    },
    shares:{
        type:Number,
        default:0
    },
    tags:{
        type:[String],
        validate:[arrayLimit, 'Maximum of 3 tags are allowed'],
        default:[]
        
    },
    images:{
        type:[String],
        required:[true,"Please upload one image"]
    }
    
});

function arrayLimit(val) {
    return val.length <=3;
  }



export const userPosts=mongoose.model('posts', PostModelSchema)