const express = require("express");
const bodyParser = require("body-parser");
const data = require("./data");
const MedBazaar = require("./models/medicine");
const Message = require("./models/message");
const app = express();

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SAVE DATA IN DATABASE

// data.forEach(function(medicine){
//     const med = new MedBazaar({
//         company: medicine.site,
//         name: medicine.pname,
//          size: medicine.psize,
//         price: medicine.mrp,
//         image_URL: medicine.image_url,
//         product_URL: medicine.product_url,    
//     });
//     med.save(function(err){
//         if(!err){
//             console.log("Data saved");
//         }
//     });
// })
let options = [];


app.get("/", (req, res) => {
  //GET DATA FROM DATABASE
  //Styling confict
  MedBazaar.find({}, function (err, medicines) {
    if (err) {
      console.log(err);
    } else {
      medicines.forEach(function (med) {
        options.push(med.name);
      });
    }
    res.render("index", {params: options})
  });


  //Handle search request
  app.post("/search", (req, res) => {
    

    // res.send("Search successful");
    console.log(req.body);
    MedBazaar.find({name:req.body.input},function(err, medicines){
        if(err){
            console.log(err);
        } else{
            console.log(medicines);
            res.render("compare", {name: req.body.input,
                params: medicines})
        }
    })
  });
});

app.post("/message", (req,res)=>{
  console.log(req.body.message);
  const msg = new Message({
    message: req.body.message,
  });
  msg.save(function(err){
    if(!err){
       console.log("Message saved");
   }
  });
  res.redirect("/");
})

app.listen(8000, () => {
  console.log("Server is listening to port 8000");
});
