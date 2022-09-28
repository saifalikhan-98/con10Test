import { savePosts } from "../../models/postsModel/savePostModel"
import { api_response, success_response } from "../../utility/responseHelper"

export const SavePosts=async(req,res)=>{
    try {
        let save_post=new savePosts(req.body)
        var populate_data=await save_post.populate('post_id');
        var save=await save_post.save()
        res.send(api_response(null,save))
    } catch (error) {
        res.send(api_response(error, 'Internal server error'))
    }

}


export const getSavedPosts=async(req,res)=>{
    try {
        const username=req.params.username
        
        savePosts.find({username:username}).populate('post_id').exec((err,data)=>{
            
            res.send(api_response(err,data))
        })
        
    } catch (error) {
        res.send(api_response(error, 'Internal server error'))
    }

}