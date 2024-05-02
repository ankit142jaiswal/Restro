const express = require('express')
const router = express.Router()

router.post('/foodData',(req,resp)=>{
    try{
        console.log([ global.food_items, global.food_categories])
        resp.send([global.food_items, global.food_categories])

    }catch(error){
        console.error(error.message);
        resp.send("Server Error")
    }
})

module.exports = router;