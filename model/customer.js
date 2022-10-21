const { number } = require('joi');
const Joi = require('joi');
const mongoose = require("mongoose");
 
 //const customerschema = new mongoose.Schema({
    // const customerschema = mongoose.model('Customer',new mongoose.Schema({
        const Customer = mongoose.model('Customer',new mongoose.Schema({

    name:{
        type:String,
        minlength: 5,
        maxlength: 50,
        required:true
    },
    phone:{
        type:String,
        minlength: 5,
        maxlength: 50,
        
    },
    age:{
        type:String  ,
        minlength: 1,
        maxlength: 3,
    },
    gender:{
        type:String,
        minlength: 1,
        maxlength: 50,
    }
}));

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50),
        phone:Joi.string().min(2).max(10),
        age:Joi.String().min(1).max(3),
        gender:Joi.string().min(1).max(10)
        
    });
//  return Joi.validate(customer, schema);
    
     
}


//   module.exports = mongoose.model('Customer',customerschema)

exports.Customer  = Customer
exports.validate = validateCustomer;