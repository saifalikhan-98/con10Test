import { user } from "../../models/usersModel/userDetails"
import { error_responses, success_response } from "../../utility/responseHelper"



export const registerUser=async (req, res)=>{
    try {
        const url=process.env.BASE_URL+'/public/uploads/'+req.file.filename
        let save_user=new user({username:req.body.username, email:req.body.email, password:req.body.password, picture:url})
        var data=await save_user.save()
        res.send(success_response(data))
    } catch (error) {
       
        res.send(error_responses(error))
    }

}

export const getUser=async(req, res)=>{
    try {
        
        user.find(req.query, (err, data)=>{
            if(err){
                res.send(error_responses(err))
            }else{
                res.send(success_response(data))
            }
            
        })
        
    } catch (error) {
        console.log('error', error)
        res.send(error_responses(error))
    }

}