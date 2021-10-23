require('dotenv').config();
const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://PCM:BlL6eRdTmiRTdt0m@medbazaar.nt6jf.mongodb.net/medbazaar?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
console.log("Mongoose connection open");
const medSchema = new mongoose.Schema({
  website: String,
  name: String,
  size: String,
  price: String,
  company: String,
  image_URL: String,
  product_URL: String,
});
module.exports = mongoose.model("MedBazaar", medSchema);