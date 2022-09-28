import { userPosts } from "../../models/postsModel/postModel"
import { user } from "../../models/usersModel/userDetails";
import { api_response, error_responses, success_response } from "../../utility/responseHelper"
import { useractions } from "../../utility/constants";


export const addPost = async(req,res)=>{
    try {
        
        const images=[]
        req.files.forEach((dict) => {
            const url=process.env.BASE_URL+'/public/posts/'+dict.filename
            images.push(url)
        });
        console.log(images)
        let post=new userPosts(
            {username:req.body.username, 
            caption:req.body.caption, 
            likes:req.body.likes,
            dislikes:req.body.dislikes,
            shares:req.body.shares,
            images:images,
            tags:req.body.tags
        })
        var post_save=await post.save()
        res.send(success_response("post saved"))
    } catch (error) {
        
        res.send(error_responses(error))
    }
    
}


export const getPost=async(req,res)=>{
    try {
        userPosts.find(req.query,(err,data)=>{
           res.send(api_response(err, data))
            
        })
    } catch (error) {
        
        res.send(api_response(error, 'Internal server error'))
    }

}

export const getPostByUsername=async(req,res)=>{
    try {
        const username=req.params.username
        
        userPosts.find({username:username},(err,data)=>{
           res.send(api_response(err, data))
            
        })
    } catch (error) {
        
        res.send(api_response(error, 'Internal server error'))
    }

}


export const updateLikesDisLikes=async(req,res)=>{
    try {
        let data=req.body
        const action=req.body.action
        const values=Object.values(useractions)
        const post_id=req.body.id
        let action_to_update={}
        if(values.includes(action)){
            console.log('exists')
        }
        
        if(action=='like'){
            action_to_update={likes:1}     
        }
        else if (action=='dislike'){
            action_to_update={dislikes:1}
        }
        else if (action=='share'){
            action_to_update={shares:1}
        }
        else if (action=='remove_like'){
            action_to_update={likes:-1}
        }
        else if (action=='remove_dislike'){
            action_to_update={dislikes:-1}
        }
        userPosts.updateOne({_id:post_id},{$inc:action_to_update},(err, data)=>{
            console.log('err', data)
            res.send(api_response(err, data))
        })
            
    } catch (error) {
        
        res.send(error_responses(error))
    }
    
}

export const deletePost=async(req,res)=>{
    try {
        
    } catch (error) {
        
        res.send(error_responses(error))
    }
    
}

export const getPostPerTag=async(req,res)=>{
    try {
        const tag="#"+req.params.tag
        userPosts.find({tags:{$regex:tag, $options : 'i'}},(err,data)=>{
           res.send(api_response(err, data))
            
        })
    } catch (error) {
        
        res.send(api_response(error, 'Internal server error'))
    }

    
}