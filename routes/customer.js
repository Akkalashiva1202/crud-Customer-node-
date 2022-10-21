const { response, json } = require("express");
const express = require("express");
// const Customer = require("../model/customer")
const { Customer, validate } = require('../model/customer');
const router = express.Router();
const Joi = require('joi');
// let MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/customer";
// router.get('/',async(req,res,next)=>{
//     try{
//         const customers = await  Customer.find()
        
//     res.json(customers);
//      }   
//     catch(err)
//     {
//         res.send("Error "+err);
//     }
//  });

router.get('/',(req,res,next)=>{
    Customer.find()
    .then(result=>{
        res.status(200).json({
            result

        });
        res.end();
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}) ;

router.get('/id/:id',async(req,res)=>{
    try{
   console.log(req.params.id);
        Customer.findById(req.params.id)
        .then(result=>{
            res.status(200).json({
                result
    });
  res.end();
   })
  }
    catch(err)
    {
        res.send("Error "+err);
        console.log(err);
        res.status(500).json({
            error:err
        })
    }
});
// router.get('/:name', (req, res) => {
//     MongoClient.connect(url, function(err, db) {
//         console.log(req.params.name);
//         if (err) throw err;
        // var dbo = db.db("customer");
       //---------------
//         try{

   
router.get('/name/:name',async (req,resp)=>{
    
    let data = await Customer.find(
        {
            "$and":[
                {name: {$regex:req.params.name}}
            ]
        }
    );
 
    if(data!=true)
    {
        console.log("got") 
        resp.send(data);
    }else{
        return resp.status(400).send("  data not found  ");
    }

});

router.get('/phone/:phone',async (req,resp)=>{
    let data = await Customer.find(
        {
            "$and":[
                {phone: {$regex:req.params.phone}}
            ]
        }
    );
    if(data == null)
    {
        
       console.log(json(data));
        return resp.status(400).send("  data not found  ");
        // resp.send(data);
    }else{
        
        resp.json(data);
        
    }

}) 

router.get('/age/:age',async(req,res)=>{
    let data = await Customer.find(
        {
            "$or":[
                {age:{$regex:req.params.age}}
            ]
        }
    );
    console.log("age is :"+data.name);
    res.send(data);
});


router.get('/min/:age',async(req,res)=>{
  
    let data = await Customer.find(
   {
            "$or":[
                {
               age:{$gte:req.params.age}
   }
            ]
        }
        );
        res.send(data);
 });

 router.get('/max/:age',async(req,res)=>{
  
    let data = await Customer.find(
   {
            "$or":[
                {
               age:{$lte:req.params.age}
   }
            ]
        }
        );
        res.send(data);
 });
 router.get('/min/max/:age1/:age2',async(req,res)=>{
  
    let data = await Customer.find(
   {
            "$and":[
                {
                    
               age:{$gt:req.params.age1}},
               {

                   age:{$lt:req.params.age2}
                }
            ]
        }
        );
        res.send(data);
 });
// router.get('min/:age', async(req,res)=>{

//     let data = await Customer.find(
//         {
//             "$or":[
//                 {age:{  $regex:(req.params.age)>3}}
                
//              ]
//         }
//     );
//     console.log(data.age);
//     res.send(data);

// });

router.get('min/', async(req,res)=>{

    const data = await Customer.find(
        {
            age:'84'
        }
    );
    console.log(data.age);
    res.send(data);

});

// router.get('/age/:age',async(req,res)=>{
//     try{
//        console.log(req.params.age);
//    }
//   catch(err)
//     {
//         res.send("Error "+err);
//     }
//     console.log("get request");
// //    res.send("get request");
// });


 
 
router.patch('/:id',async(req,res)=>{
    try{
        const customer = await Customer.findById(req.params.id);
        customer.name = req.body.name
        customer.phone = req.body.phone
        customer.age = req.body.age
        customer.gender = req.body.gender
        
        const a1 = await customer.save();
        res.json(a1);
        
        
    }
    catch(err)
    {
        res.send("Error "+err);
    }
    console.log("get request");
    
});


router.patch('/ph/:phone',async(req,res)=>{
    try{
        let customer = await Customer.findOne(
            {
                "$and":[
                    {phone: {$regex:req.params.phone}}
                ]
            }
       
        );
        if(customer)
        {

            customer.name = req.body.name
            customer.phone = req.body.phone
            customer.age = req.body.age
            customer.gender = req.body.gender
            
            const a1 = await customer.save();
            res.json(a1);
        }else{
            res.status(400).send("nothing to update")
        }
        
        
    }
    catch(err)
    {
        res.send("Error "+err);
    }
     
    
});


router.put('/pho/:phone',async(req,res)=>{
   
        let customer = await Customer.findOne(
            {
                "$and":[
                    {phone: {$regex:req.params.phone}}
                ]
            }
       
        );
        if(customer)
        {
            res.status(400).send("nothing to update")
        }
        else{
            customer.name = req.body.name
            customer.phone = req.body.phone
            customer.age = req.body.age
            customer.gender = req.body.gender
            
            const a1 = await customer.save();
            res.json(a1);
             
        }
    }
 
 );


 
router.put('/phon/:phone',async(req,res)=>{
   
    let customer = await Customer.findOne({phone:req.params.phone});
    if(customer)
    {
        
        customer.name = req.body.name
        customer.phone = req.body.phone
        customer.age = req.body.age
        customer.gender = req.body.gender
        
        const a1 = await customer.save();
        res.json(a1);
    }
    else{
        res.status(400).send("nothing to update")
         
    }
}

);


router.delete('/:id',async(req,res)=>{
    try{
        const customer = await Customer.findById(req.params.id);
        customer.gender = req.body.gender
        const a1 = await customer.remove();
        res.json(a1);
        res.send();
        res.redirect();
        
    }
    catch(err)
    {
        res.send("Error "+err);
    }
    console.log("get request");
    
});

router.post('/',async(req,res)=>{
    // const {error} = validate(req.body);
    // if(error)
    // {
    //     return req.status(400).send(error.details[0].message);
    // }
    let customer = await Customer.findOne({name:req.body.name});
    if(customer)
    {
        return res.status(400).send("That user is already exists");
    }
    else{
   customer=  new Customer({
            name: req.body.name,
        phone: req.body.phone,
        age: req.body.age,
        gender:req.body.gender
        });
        
        await customer.save();
        res.send(customer);
   // }
 
    // await user.save();
    // res.send(user);
    // try{
   
    //    const a1 = await customer.save();
    //     res.json(a1);
    // }
    // catch(err)
    // {
    //      res.send('Error');
    // }
     
};
});
module.exports =router;

    // const customer = new Customer({
    //     name:req.body.name,
    //     phone:req.body.phone,
    //     age:req.body.age,
    //     gender:req.body.gender
 