const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const dbConnect = require('./mongodb');

// const jwt = require('jsonwebtoken')
// const bcrypt = require("bcryptjs");
// const mongodb = require('mongodb');
// const schemas = require('./schemas');
// const order = require('./order_schemas')

app.use(express.json());

app.use((req,resp,next)=>{
    resp.header("Access-Control-Allow-Origin","*");
    resp.header(
        "Access-Control-Allow-Headers",
        "GET, POST,PUT, DELETE,OPTIONS,HEAD"
    );
    resp.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type, Accept, Authorization"
    );
    next(); 
})

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));


// const jwtSecret ="asdfghjklqwertyuiopzxcvbnmasdf#$"

// app.get('/', (req, res) => {
//     res.send('Hello World!');
//     // let data = await dbConnect();
//     // data = await data.find().toArray();
//     // console.log(data);


// })

// app.post('/signup', async (req, resp) => {
//     const salt = await bcrypt.genSalt(10);
//     let secPassword = await bcrypt.hash(req.body.password,salt);
    
//     // const userData = await schemas.create({
//     //     name : req.body.name,
//     //     email: req.body.email,
//     //     password: secPassword,
//     //     location:req.body.location

//     // }).then(resp.json({success:true}));
//     let data = await dbConnect();
//     let result = await data.insertOne(req.body)
//     console.log(req.body)
    
//     resp.send(result);
      
    
    
   
    

// });

// app.post('/login', async (req, resp) => {
//     let data = await dbConnect();
//     let userData = await data.findOne(req.body);
    
//     if (!userData) {
//         return resp.status(400).json({
//             errors: "Try logging with correct Credentials"
//         })
//     }
//     // const pwdCopmare = await bcrypt.compare(req.body.password,userData.password)
//     if (req.body.password !== userData.password) {
//         return resp.status(400).json({
//             errors: "Try logging with correct Credentials"
//         })
        
//     }
//     const signData = { 
//         user: {
//             id : userData.id
//         }
//     }

//     const authToken = jwt.sign(signData,jwtSecret)
//     console.log( req.body);
    
//     return resp.json({
//         success: "true",
//         authToken : authToken
//     })
   




// })

// app.post("/foodData",async(req,resp)=>{
//     try{
//         console.log(global.food_items,global.food_categories)
//         resp.send([global.food_items,global.food_categories])
//     }catch(error){
//         console.error(error.message);
//         resp.send("Server Error");

//     }

// })


// router.post('/orderData' , async(req,res)=>{
//     let data = req.body.order_data
//     await data.splice(0,0,{ Order_data : req.body.order_data})

//     let eId = await Order.findOne ({ 'email' : req.body.email})
//     console.log(eId)
//     if ( eId===null){
//         try{
//             await Order.create({
//                 email:req.body.eamil,
//                 order_data:[data]

//             }).then(()=>{
//                 res.json({success : true})
//             })
//         }catch ( error){
//             console.log(error.message)
//             res.send("Server Error", error.message)

//         }
//     }
//     else{
//         try{
//             await Order.findOneAndUpdate({ email : req.body.email},
//                 { $push : { order_data :data}}).then(()=>{
//                     res.json({success: true})

//                 })

//         }catch ( error){
//             res.send("Server Error",error.message)
            
//         }
//     }

// })

// router.post('/myorderData',async ( req, resp)=>{
//     try{
//         let myData = await Online.findOne({'email': req.body.email})
//         resp.json({orderData: myData})
//     }catch(error){
//         resp.send("Server Error",error.message)

//     }
// })



app.listen(5001);

