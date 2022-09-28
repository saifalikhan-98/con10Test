import { addPost, getPost, getPostByUsername, getPostPerTag, updateLikesDisLikes } from "../controllers/postControllers/postData";
import { uploads } from "../middlewares/imageUpload"
import { SavePosts, getSavedPosts } from "../controllers/postControllers/savePosts";

const postRoutes=(app)=>{
    app.route('/post') 
    .post(uploads.array('images', 6),addPost)  // to create new post with maximum images as 6
    .get(getPost) // get all posts

    app.route('/post/:username') // get all posts by particular user
    .get(getPostByUsername)
    
    app.route('/post/update') // add remove likes and dislikes
    .put(updateLikesDisLikes)

    app.route('/post/tag/:tag') // get by tag
    .get(getPostPerTag)


    app.route('/post/save') //save a post
    .post(SavePosts)

    app.route('/post/save/:username') //get saved posts by user
    .get(getSavedPosts)
}



export default postRoutes;