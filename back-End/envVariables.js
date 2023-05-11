require('dotenv').config();
const mongoString = process.env.DATABASE_URL;
const port=process.env.port;
const inventoryDb=process.env.inventoryDb;
const productDb=process.env.productDb
const database=process.env.database

module.exports={
    mongoString:mongoString,
    port:port,
    inventoryDb:inventoryDb,
    productDb:productDb,
    database:database
}