require('dotenv').config();
const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://PCM:BlL6eRdTmiRTdt0m@medbazaar.nt6jf.mongodb.net/medbazaar?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
console.log("Mongoose connection open");
const msgSchema = new mongoose.Schema({
 message : String,
});
module.exports = mongoose.model("Message", msgSchema); 