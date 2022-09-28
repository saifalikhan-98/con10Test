import { mongoose, Schema } from "mongoose";
import { userPosts } from "../../models/postsModel/postModel"

const SavePost=new Schema({
    post_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: true,
    },
    username:{
        type:String
    },
    saved_at:{
        type:Date,
        default:Date.now
    }
});


export const savePosts=mongoose.model('saved_posts', SavePost)