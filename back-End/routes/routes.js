const express = require('express');
const envVariables=require("../envVariables");
const router = express.Router()
router.use(express.json())
module.exports = router;
let MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
let url = envVariables.mongoString;


router.post('/add', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    let dbo = db.db(envVariables.database);
    if (err) throw err;
    // add new product to product collection
    console.log(req.body)
    dbo.collection(envVariables.productDb).insertOne({
      product_name: req.body.product_name,
      product_description: req.body.product_description,
      product_price: req.body.product_price,
      product_category: req.body.product_category
    }, function(err, result) {

      if (err) {
        res.send(err);
      } else {
        // add product to inventory collection with initial quantity of 0
        dbo.collection(envVariables.inventoryDb).insertOne({
          product_id: result.insertedId,
          product_quantity: 0,
          product_location: req.body.product_location,
          last_updated: new Date().toLocaleDateString()
        }, function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send("Product added successfully");
          }
          db.close();
        });
      }
    });
  });
})

router.get('/find/:name', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    let dbo = db.db(envVariables.database);
    if (err) throw err;

    const productName = req.params.name;

    dbo.collection(envVariables.productDb).find({ product_name: productName }).toArray(function(err, products) {
      if (err) throw err;

      if (products.length === 0) {
        res.send("No products found");
      } else {
        res.send(products);
      }

      db.close();
    });
  });
});


router.get('/getAll', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    console.log(url,envVariables)
    let dbo = db.db(envVariables.database);
    if (err) throw err;
   
    dbo.collection(envVariables.inventoryDb).find({}).toArray (function(err, result) {
      if (err){
        res.send(err);
      }else if(result){
        res.send(result);
        console.log(result.name);
      }
      db.close();
    });
  });
}) 

router.patch('/update/:name', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    let dbo = db.db(envVariables.database);
    if (err) throw err;
   
    const productName = req.params.name;
    const updateData = {
      product_description: req.body.product_description,
      product_price: req.body.product_price
    };

    dbo.collection(envVariables.productDb).updateOne({ product_name: productName }, { $set: updateData }, function(err, result) {
      if (err) throw err;
      
      if (result.modifiedCount === 0) {
        console.log("Product not found");
        res.send("Product not found");
      } else {
        console.log("Product updated successfully");
        res.send("Product updated successfully");
      }

      db.close();
    });
  });
});

router.delete('/delete/:name', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    let dbo = db.db(envVariables.database);
    if (err) throw err;
   
    // find the product id using name-connect to product collection
    dbo.collection(envVariables.productDb).find({ product_name: req.params.name }).toArray( function(err, products) {
      if (err) throw err;
      if (products.length===0) {
        console.log("Product not found")
        res.send("Product not found");
        db.close();
        return;
      }
      // console.log(products.length)
      const deleteFromProducts = products.map((product) => {
        const productId = product._id;
        
        // Delete each product individually
        console.log(product)
       return dbo.collection(envVariables.productDb).deleteOne({ _id: ObjectId(productId)});
      });
      const deleteFromInventory = products.map((product) => {
        const productId = product._id;
        
        // Delete each product individually
        console.log(product)
       return dbo.collection(envVariables.inventoryDb).deleteOne({ product_id: ObjectId(productId)});
      });
      Promise.all(deleteFromProducts)
        .then(() => {
          console.log("Products deleted successfully");
    
        })
        .then(()=>{
          Promise.all(deleteFromInventory)
          .then(() => {
            console.log("Products deleted successfully from inventory");
            res.send("Products deleted successfully from inventory and product list");
            db.close();
          })
        })
        .catch((err) => {
          throw err;
        });
   
    });
  });
})

