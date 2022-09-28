import postRoutes from "./postRouter";
import userRoutes from "./usersRoutes"

const routes=(app)=>{
    userRoutes(app)
    postRoutes(app)

}

export default routes;