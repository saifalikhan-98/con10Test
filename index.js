import express from 'express';
import routes from './src/routes/mainRoutes'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { uploads } from './src/middlewares/imageUpload';
const dotenv = require('dotenv');


const app= express();

dotenv.config();
const port=process.env.PORT;
const db_url=process.env.MONGODB
//mongoose connection

mongoose.Promise=Promise

mongoose.connect(db_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}, (err)=>{
    console.log("Mongo db connection error", err)
});

//body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));



routes(app);

// serving static files
app.use('/public', express.static(__dirname + "/public"));

app.get('/', (req, res)=>{
    res.send(`Node and server express running on port ${port}`)
})

app.post('/register/user', uploads.single('picture'), async(req,res, next)=>{
    try {
        console.log('body',req.body)
        const save_user=user(req.body)
        // uploads(req, res,(err)=>{
        //         if(err){
        //             console.log('file error',err)
        //         }else{
        //             console.log('file uploaded')
        //         }
        // }).single('picture')
        var data=await save_user.save()
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

app.use((err, req, res, next)=>{
    console.log(req)
    console.error(err.stack);
    res.send(err)

})

app.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})