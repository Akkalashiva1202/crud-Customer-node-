const express = require("express");
const mongoose = require("mongoose");
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const url = 'mongodb://localhost/Customer'
const app = express();
mongoose.connect(url,{useNewUrlParser:true}).then(()=> console.log("now connected to database")).catch(err =>{console.error('something went wrong ',err)});
const con = mongoose.connection
con.on('open',()=>
{
    console.log("connected...");
});

app.use(express.json());

const customerrouter = require('./routes/customer');
 app.use('/customer',customerrouter);
// app.use('/customer',(req,res)=>{

//     if(req == customer)
//     {
//         res.customerrouter;
//     }
//     else{
//         res.customerrouter;
//     }
//  });
 
app.listen(9000,function()
{
        console.log("server started ")
})