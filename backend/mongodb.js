const mongoose = require('mongoose');
const mongoURI = 'mongodb://ankit2020cs142:Ankit123456@ac-pnzl8mi-shard-00-00.qiochcd.mongodb.net:27017,ac-pnzl8mi-shard-00-01.qiochcd.mongodb.net:27017,ac-pnzl8mi-shard-00-02.qiochcd.mongodb.net:27017/restro?ssl=true&replicaSet=atlas-8j66f7-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster1'
// const mongoURI = 'mongodb+srv://ankit2020cs142:Ankit123456@cluster1.qiochcd.mongodb.net/restro?retryWrites=true&w=majority&appName=Cluster1';
// const { MongoClient } = require('mongodb');
// const client = new MongoClient(url);
// const databaseName = 'restro'


async function dbConnect() {
    
    // let result =
    await mongoose.connect(mongoURI).then(async()=>{
        // let db = result.db(databaseName);
        console.log("Connected Successfully !!");
        const food_items = await mongoose.connection.db.collection('food_items');        
        await food_items.find({}).toArray().then(
            async (data , err)=>{
                const food_categories = await mongoose.connection.db.collection('food_categories');
                await food_categories.find({}).toArray().then(async (catData, err)=>{
                    if (err){
                        console.log(err); 
                    }else{
                        global.food_items = data;
                        global.food_categories = catData;
                        // console.log(global.food_items)
                        // console.log( global.food_categories)

                    }
                });

            // if (err){
            //     console.log("---",err)
            // }else{
            //     global.food_items = data;
            //     console.log()
            // }
     } )
       
     
        
        
       
    }).catch((err)=>{
        console.log("---",err);
    });

    
     // // food_categories
    //  let food_categories_collection = db.collection('food_categories');
    //  let food_categories_respose = food_categories_collection.find({}).toArray();
    //  global.food_categories = food_categories_respose;
    //  console.log(global.food_categories);
   
    // // food_items
    // let food_items_collection = db.collection('food_items');
    // let food_items_respose = await food_items_collection.find({}).toArray();
    // global.food_items= food_items_respose;
    // console.log(global.food_items);

    // //user_data
    // let user_collection = db.collection('users');
    // let user_respose = await user_collection.find({}).toArray();
    // console.log(user_respose);
    
    
    


    // return db.collection('fo');


}


module.exports = dbConnect();