import { Schema } from "mongoose";

export const postImageModel=new Schema({
    image:{
        type:String
    },
    post_id:{
        type:String
    },
    uploaded_at:{
        type:Date,
        default:Date.now
    }
});