const express = require('express')
const router = express.Router()
const  Order = require('../models/Orders')



router.post('/orderData' , async(req,resp)=>{
    let data = req.body.order_data
    await data.splice(0,0,{ Order_data : req.body.order_data})
   
    let eId = await Order.findOne({email : req.body.email})
    console.log(eId)
    if (eId===null){
        try{
            await Order.create({
                email:req.body.email,
                order_data:[data]

            }).then(()=>{
                resp.json({success : true})
            })
            console.log("Success");
        }
        catch{
            
            resp.json({success : false})

        }
    }
    else{
        try{
            await Order.findOneAndUpdate({ email : req.body.email},
                { $push : { order_data :data}}).then(()=>{
                    resp.json({success: true})

                })
        }catch{
            resp.json({success : false})

        }
    }

})


router.post('/myorderData',async ( req, resp)=>{
    try{
        let myData = await Order.findOne({'email': req.body.email})
        resp.json({orderData: myData})
    }catch(error){
        resp.send("Server Error",error.message)

    }
})
module.exports = router;