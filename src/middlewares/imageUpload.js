import multer from "multer";


const storage= multer.diskStorage({
    destination:(req, file, cb)=>{
        let dest=decide_destination(req)
        cb(null,dest )
    },
   
    filename:(req,file, cb)=>{
        
        cb(null,+Date.now()+file.originalname);
    },
})

export const uploads= multer({
    storage:storage,
    limits:{
        fileSize:4*1024*1024,
    },
    fileFilter:(req, file, cb)=>{
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype=='image/gif') {
            cb(null, true);
        } else {
            cb(null, false);
            const error={
                status:'error',
                response:'ExtensionError Only .png, .jpg and .jpeg and .gif format allowed!'
            }
            return cb(error);
        }
    },
})

function decide_destination(data){
    try {
        const img=data.files.length
        return "./public/posts"
    } catch (error) {
        return "./public/uploads"
    }
   
}