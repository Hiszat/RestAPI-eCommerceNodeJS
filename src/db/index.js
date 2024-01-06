// const { MongoClient } = require('mongodb');

// const url = "mongodb://admin:gantengbanget@localhost:27017?authSource=admin";
// const client = new MongoClient(url);

// (async () => {
//     try {
//         await client.connect();
//         console.log("Koneksi Berhasil");
//     } catch (error) {
//         console.log(error);    
//     }
// })();

// const db = client.db("eduwork-native");

const mongoose = require("mongoose");
mongoose.connect("mongodb://admin:gantengbanget@localhost:27017/eduwork-mongoose?authSource=admin");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () =>console.log("Connected to MongoDB") );
