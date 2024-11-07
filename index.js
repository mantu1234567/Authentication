const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/user');

 app.use(cors());
 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
 
 app.use('/user',userRoutes);
  
 app.use((error,req,res,next)=>{
    const message = error.message || "server error";
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({message:message});
});
// Connect to MongoDB
connectDB();
app.listen(process.env.PORT,()=>console.log('server is running on port:'+process.env.PORT));