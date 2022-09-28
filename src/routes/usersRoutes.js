import { registerUser, getUser } from "../controllers/usersControllers/registerUsers"
import { uploads } from "../middlewares/imageUpload"

const userRoutes=(app)=>{
    app.route('/register')
    .post(uploads.single('picture'),registerUser) // register new users

    app.route('/user') //get allusers or discover api
    .get(getUser)

}



export default userRoutes;