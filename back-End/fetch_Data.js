// const mongoString = require("./dbKeyApi");
// let data=require("./temp/flightprice_data");
// const mongoString = mongoString;

// var MongoClient = require('mongodb').MongoClient;

// const client = new MongoClient(mongoString);

// async function run() {
//   try {
//     await client.connect();

//     const database = client.db("flight_Data");
//     const foods = database.collection("flight_information");
//     const options = { ordered: true };

//     const result = await foods.insertMany([...data], options);
//     console.log(`${result.insertedCount} documents were inserted`);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);
