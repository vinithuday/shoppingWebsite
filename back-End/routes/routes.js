// const express = require('express');
// const databseApiKey=require("../dbKeyApi");
// const router = express.Router()

// module.exports = router;

// var MongoClient = require('mongodb').MongoClient;
// var url = databseApiKey;






// router.post('/post', (req, res) => {
//     res.send('Post API')
// })


// router.get('/getAll', (req, res) => {
//     // let dateRe=(req.params.date).split("-"); 
//     // let dateCon=`${dateRe[2]}/${dateRe[1]}/${dateRe[0]}` 
    
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db("inventory_Management");
//         dbo.collection("InventoryCollection").find({}).toArray (function(err, result) {
//           if (err){
//             res.send(err);
//           }else if(result){
//               res.send(result);
//               console.log(result.name);
//               //${req.params.source} ${req.params.destination} ${req.params.class} ${req.params.date}
//           }
//           db.close();
//         });
//       });
    
// }) 


// router.patch('/update/:id', (req, res) => {
//     res.send('Update by ID API')
// })

// //Delete by ID Method
// router.delete('/delete/:id', (req, res) => {
  
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("inventory_Management");
//     //find the product id using name-connect to product collection
//     //using product id find the quantitiy in inventory collection
//     //update the quantity -1
//     dbo.collection("InventoryCollection").findOneAndDelete().toArray (function(err, result) {
//       if (err){
//         res.send(err);
//       }else if(result){
//           res.send(result);
//           console.log(result.name);
//           //${req.params.source} ${req.params.destination} ${req.params.class} ${req.params.date}
//       }
//       db.close();
//     });
//   });
// })




const express = require('express');
const databseApiKey=require("../dbKeyApi");
const router = express.Router()

module.exports = router;

var MongoClient = require('mongodb').MongoClient;
var url = databseApiKey;

// router.post('/post', (req, res) => {
//   res.send('Post API')
// })

router.post('/add', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("inventory_Management");
    // add new product to product collection
    dbo.collection("ProductCollection").insertOne({
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
        dbo.collection("InventoryCollection").insertOne({
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
    if (err) throw err;
    var dbo = db.db("inventory_Management");
    dbo.collection("InventoryCollection").find({}).toArray (function(err, result) {
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
    if (err) throw err;
    var dbo = db.db("inventory_Management");
    // find the product id using name-connect to product collection
    dbo.collection("ProductCollection").findOne({ product_name: "mi" }, function(err, product) {
      if (err) throw err;
      if (!product) {
        res.send("Product not found");
        db.close();
        return;
      }
      // using product id find the quantity in inventory collection and update the quantity -1
      var productId = product.product_id;
      dbo.collection("InventoryCollection").findOneAndUpdate(
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