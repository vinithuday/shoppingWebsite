const express = require('express');
const databseApiKey=require("../dbKeyApi");
const router = express.Router()

module.exports = router;

var MongoClient = require('mongodb').MongoClient;
var url = databseApiKey;





router.post('/post', (req, res) => {
    res.send('Post API')
})


router.get('/getAll', (req, res) => {
    res.send('Get All API')
})


router.get('/getOne/:source/:destination/:class/:date', (req, res) => {
    let dateRe=(req.params.date).split("-"); 
    let dateCon=`${dateRe[2]}/${dateRe[1]}/${dateRe[0]}` 
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("flight_Data");
        dbo.collection("flight_information").find({source:`${req.params.source}`,destination:`${req.params.destination}`,start_date:`${dateCon}`}).toArray (function(err, result) {
          if (err){
            res.send(err);
          }else if(result){
              res.send(result);
              console.log(result.name);
              //${req.params.source} ${req.params.destination} ${req.params.class} ${req.params.date}
          }
          db.close();
        });
      });
    
})


router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})