const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisEndtoEndYoutubeChannel$#"


router.post('/createuser',
    [
        body('email').isEmail(),
        body('name').isLength({ min: 5 }),
        body('password', 'Incorrect Password').isLength({ min: 5 })
    ]
    ,
    async (req, resp) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() })
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password ,salt)
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            resp.json({ success: true });

        } catch (error) {
            console.log(error)
            resp.json({ success: false });


        }


    })



router.post('/loginuser',
[
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })
]
,
async (req, resp) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() })
    }
    let email =  req.body.email;
    try {
        let userData = await User.findOne({email});
        if (!userData ){
            return resp.status(400).json({ errors: "Try logging with correct Credentials" });
        }
        const pwdCopmare = await bcrypt.compare(req.body.password,userData.password);

      if (!pwdCopmare){
        return resp.status(400).json({ errors: "Try logging with correct Credentials" });

      }else{
          const data = {
              user: {
                id:userData.id
              }
        }
        const authToken = jwt.sign(data,jwtSecret)
        return resp.json({ success: true, authToken : authToken });            
      }

    } catch (error) {
        console.log(error)
        resp.json({ success: false });
    }
})


// router.post('/user',async(req,resp)=>{

//     console.log(req.body)
//     let data = await dbConnect();
//     let result =await data.insertOne(req.body)
//     resp.send(result)
// })




module.exports = router;