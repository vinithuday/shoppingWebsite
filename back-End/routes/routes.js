const express = require('express');
const envVariables=require("../envVariables");
const router = express.Router()
module.exports = router;
let MongoClient = require('mongodb').MongoClient;
let url = envVariables.mongoString;


router.post('/add', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    let dbo = db.db(envVariables.database);
    if (err) throw err;
    // add new product to product collection
    dbo.collection(envVariables.productDb).insertOne({
      product_id: req.body.product_id,
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
          product_id: req.body.product_id,
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

router.patch('/update/:id', (req, res) => {
  res.send('Update by ID API')
})

router.delete('/delete/:id', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    let dbo = db.db(envVariables.database);
    if (err) throw err;
   
    // find the product id using name-connect to product collection
    dbo.collection(envVariables.productDb).findOne({ product_name: "mi" }, function(err, product) {
      if (err) throw err;
      if (!product) {
        res.send("Product not found");
        db.close();
        return;
      }
      // using product id find the quantity in inventory collection and update the quantity -1
      var productId = product.product_id;
      dbo.collection(envVariables.inventoryDb).findOneAndUpdate(
        { product_id: productId },
        { $inc: { product_quantity: -1 } },
        { returnOriginal: false },
        function(err, result) {
          if (err) throw err;
          if (!result.value) {
            res.send("Inventory not found");
          } else {
            res.send(result.value);
            console.log(result.value.product_quantity);
          }
          db.close();
        }
      );
    });
  });
})