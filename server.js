const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const { connect } = require('http2');
const mongoose = require('mongoose');
const session = require('express-session');
var nodemail = require('nodemailer');
const formidable=require("express-formidable")


////






const connectDB=require('./server/database/connection');
const app = express();
dotenv.config({path:'config.env'});
const PORT =process.env.PORT || 3000


app.use(morgan('tiny'));

app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.set('views',path.resolve(__dirname, 'views'));

//load assets
app.use('/css',express.static(path.resolve(__dirname, 'assets/css')));
app.use('/images',express.static(path.resolve(__dirname, 'assets/images')));
app.use('/js',express.static(path.resolve(__dirname, 'assets/js')));

app.use('/',require('./server/routes/router'))
app.use('/forget',require('./server/routes/router'))

app.use(formidable({
    multiples:true,
}))

app.use("/uploads",express.static(__dirname + '/uploads'))

//connection
connectDB();


// app.post("/uploadImages",async function(req, res) {
//     const images=[]
//     if(Array.isArray(req.files.images)){
//         for(let i=0; i<req.files.images.length; i++){
//             images.push(req.files.images[i])
//         }
//     }
//     else{
//         images.push(req.files.images)
//     }
//     callbackFileUpload(images,0,[],async function(savedPaths){
//         await 
//     })
// })









app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})