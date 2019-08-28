var express=require('express')
const app=express();
var bodyparser=require("body-parser")
app.set("view engine","ejs")
app.set("views","./src/views")
const path = require('path')
var mongoose = require('mongoose')

var userrouter = require("./routes/userrouter")
app.use("/user",userrouter);
var prodrouter = require("./routes/prodrouter")
app.use("/prod",prodrouter);


var url = "mongodb+srv://Nithin:nithinnarayan@cluster0-mlapr.mongodb.net/mydb?retryWrites=true&w=majority";
var products = require("./model/product"); 
mongoose.connect(url,function(err){
    if(err) 
    throw err;
    else
    console.log("user db connected")
});








app.use(express.static(path.join(__dirname,"/public")))
app.use(bodyparser.urlencoded({extended:true}))
app.get("/",function(req,res){

    res.render("index",{nav:[{link:"",title:"Home"},{link:"/userpr",title:"Products"},{link:"/user",title:"login"}]})
});


app.get("/userpr",function(req,res){
    products.find({},function(err,result){
    res.render("userproduct",{nav:[{link:"/",title:"Home"},{link:"/userpr",title:"Products"},{link:"/user",title:"login"}],products:result})
});
});




app.get("/ussp/:id",function(req,res){
    products.find({id:req.params.id},function(err,result){
        res.render("usersingle",{nav:[{link:"/",title:"Home"},{link:"/userpr",title:" Products"}],products:result});  
      })
        
    })
app.listen(process.env.PORT || 3000, () => console.log('Server Running on http://localhost:3000'));