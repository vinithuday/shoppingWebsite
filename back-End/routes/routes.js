const express = require("express");
const envVariables = require("../envVariables");
const router = express.Router();
router.use(express.json());
module.exports = router;
let MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
let url = envVariables.mongoString;

router.post("/add", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    let dbo = db.db(envVariables.database);
    if (err) throw err;
    // add new product to product collection
    console.log(req.body);
    dbo.collection(envVariables.productDb).insertOne(
      {
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price,
        product_category: req.body.product_category,
      },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          // add product to inventory collection with initial quantity of 0
          dbo.collection(envVariables.inventoryDb).insertOne(
            {
              product_id: result.insertedId,
              product_quantity: req.body.product_quantity,
              product_location: req.body.product_location,
              last_updated: new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' }),
            },
            function (err, result) {
              if (err) {
                res.send(err);
              } else {
                res.send("Product added successfully");
              }
              db.close();
            }
          );
        }
      }
    );
  });
});

router.get("/find/:name", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    let dbo = db.db(envVariables.database);
    if (err) throw err;

    const productName = req.params.name;

    dbo
      .collection(envVariables.productDb)
      .find({ product_name: productName })
      .toArray(function (err, products) {
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

router.get("/getAll/:collection", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    console.log(url, envVariables);
    let dbo = db.db(envVariables.database);
    if (err) throw err;

    dbo
      .collection(req.params.collection==='products'?envVariables.productDb:req.params.collection==='inventory'?envVariables.inventoryDb:null)
      .find({})
      .toArray(function (err, result) {
        if (err) {
          res.send(err);
        } else if (result) {
          res.send(result);
          console.log(result.name);
        }
        db.close();
      });
  });
});



router.patch("/update/:id", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    let dbo = db.db(envVariables.database);
    const updateProductData = {};
    const updateInventoryData = {};

    if (req.body.product_name) {
      updateProductData.product_name = req.body.product_name;
    }
    if (req.body.product_description) {
      updateProductData.product_description = req.body.product_description;
    }
    if (req.body.product_price) {
      updateProductData.product_price = req.body.product_price;
    }
    if (req.body.product_category) {
      updateProductData.product_category = req.body.product_category;
    }
    if (req.body.product_quantity) {
      updateInventoryData.product_quantity = req.body.product_quantity;
    }
    if (req.body.product_location) {
      updateInventoryData.product_location = req.body.product_location;
    }
    updateInventoryData.last_updated = new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' });


    dbo.collection(envVariables.productDb).findOneAndUpdate(
      { _id: ObjectId(req.params.id) },
      { $set: updateProductData, $setOnInsert: { updated_id: ObjectId() } },
      { upsert: true, returnOriginal: false },
      function (err, result) {
        if (err) throw err;

        if (!result.value) {
          console.log("Product not found");
          res.send("Product not found");
          db.close();
          return;
        }
        dbo.collection(envVariables.inventoryDb).updateOne(
          { product_id: ObjectId(req.params.id)},
          { $set: updateInventoryData },
          function (err, resultIn) {
            if (err) throw err;

            if (resultIn.modifiedCount === 0) {
              console.log("Inventory not found");
              res.send("Inventory not found");
            } else {
              console.log("Inventory updated successfully");
              res.send("Product and Inventory updated successfully");
            }

            db.close();
          }
        );
      }
    );
  });
});




router.delete("/delete/:id", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    let dbo = db.db(envVariables.database);
    if (err) throw err;

    // find the product id using name-connect to product collection
    dbo
      .collection(envVariables.productDb)
      .find({ _id: ObjectId(req.params.id)})
      .toArray(function (err, products) {
        if (err) throw err;
        if (products.length === 0) {
          console.log("Product not found");
          res.send("Product not found");
          db.close();
          return;
        }
        // console.log(products.length)
        const deleteFromProducts = products.map((product) => {
          // Delete each product individually
          console.log(product);
          return dbo
            .collection(envVariables.productDb)
            .deleteOne({ _id: ObjectId(req.params.id) });
        });
        const deleteFromInventory = products.map((product) => {
          // Delete each product individually
          console.log(product);
          return dbo
            .collection(envVariables.inventoryDb)
            .deleteOne({ product_id: ObjectId(req.params.id) });
        });
        Promise.all(deleteFromProducts)
          .then(() => {
            console.log("Products deleted successfully");
          })
          .then(() => {
            Promise.all(deleteFromInventory).then(() => {
              console.log("Products deleted successfully from inventory");
              res.send(
                "Products deleted successfully from inventory and product list"
              );
              db.close();
            });
          })
          .catch((err) => {
            throw err;
          });
      });
  });
});
