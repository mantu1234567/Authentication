 const User = require("../models/User")
const bcrypt = require('bcrypt')
const Joi = require('joi'); // Make sure you have imported Joi properly
 const register = async (req,res,next)=>{

      const {error:validationError} = validateUser(req.body)
     const {name,email,password} = req.body

     try{
      if(validationError){
        const error = new Error(validationError.details[0].message);
        error.statusCode =400;
        throw error;
      }
        const formatedName = name.toLowerCase();
        const formatedEmail = email.toLowerCase();

        const  findedUser =  await User.findOne({email:formatedEmail})
        if(findedUser){
            const error = new Error('this email is already exist')
            error.statusCode =400
            throw error
        }
       const hashedPassword = await bcrypt.hash(password,10);
       
       const newUser = new User({
        name:formatedName,
        email:formatedEmail,
        password:hashedPassword,
       });

        await newUser.save();

       res.status(200).json({message:"user register sussessfully",status:true});
     }
       catch(error){
       next(error);
     }
 };

 module.exports = register;

 function validateUser(data){
  const schema = Joi.object({
    name: Joi.string().min(2).required(),   // Use lowercase 'string()'
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});
return schema.validate(data);
 }