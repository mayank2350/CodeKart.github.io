const express=require("express")
const hbs=require("hbs")
const app=express()
const bodyParser=require("body-parser")
//mongoose connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/mywork').then(() => console.log('Connected!'));
//creating schema to score in db
const Detail= new mongoose.Schema({
    brandname:String,
    brandconurl:String,
    links:[
        {
        label:String,
        url:String,
    },
],
})
//creating collection
const alpha=mongoose.model("alpha",Detail)
// const d=new alpha({
//     brandname:"hj",
//     brandconurl:"fy",
//     links:[{
//         label:"Home",
//         url:"/"
//     },
//     {
//         label:"services",
//         url:"/services"
//     },
//     {
//         label:"gallery",
//         url:"/gallery"
//     },
//     {
//         label:"contact",
//         url:"/contact"
//     }
// ]
//})
//d.save()
const Slider= new mongoose.Schema({
    title:String,
    subtitle:String,
    imageurl:String,
    class:String
})
const slider=mongoose.model("slider",Slider)

// slider.create([{
//         title:'learnjava',
//         subtitle:"ygdkyguygy",
//         imageurl:"/static/1.jpg",
//         class:"active"
//     },
//     {
//             title:'python',
//             subtitle:"dhsguydkg",
//             imageurl:"/static/3.jpg"
//         }, 
//         {
//             title:'c++',
//             subtitle:"dhsguydkg",
//             imageurl:"/static/2.jpg"
//         },
    
// ])
const service=new mongoose.Schema({
    icon:String,
    title:String,
    descripton:String,
    linktext:String,
    link:String
})
const services=mongoose.model("services",service)
// services.create([{
//     icon:'fa fa-adjust',
//     title:'provide best course',
//     descripton:'jljfhlh',
//     linktext:'http://www.alpha.com',
//     link:'check'
// },{
//     icon:'fa fa-audio-description',
//     title:'provide  course',
//     descripton:'jljfhlh',
//     linktext:'http://www.alpha.com',
//     link:'lesrn'
// },{
//     icon:'fa fa-audio-description',
//     title:'provide  course',
//     descripton:'jljfhlh',
//     linktext:'http://www.alpha.com',
//     link:'lesrn'
// }
// ])






app.use('/static',express.static("static"))
app.use(bodyParser.urlencoded({
    extended:true
}))
app.set('view engine','hbs')
app.set("views","views")
hbs.registerPartials("views")

app.get("/gallery",async(req,res)=>{
    const detail=await alpha.findOne({"_id":"6498445eab4cba01796fbd8f"})
   res.render("gallery",{detail:detail})
})
app.get("/",async (req,res)=>{
    const detail=await alpha.findOne({"_id":"6498445eab4cba01796fbd8f"})
    const slide=await slider.find()
    const servi=await services.find()
  
    // console.log(detail)
    res.render("index",{detail:detail,
    slide:slide,
servi:servi})
})

const contact= new mongoose.Schema({
    email:String,
    name:String,
    phone:String,
    query:String
})
const Contact=mongoose.model("Contact",contact)


app.post("/process-contact",async (req,res)=>{
    try {
      const data=await Contact.create(req.body)  
      console.log(data)
      res.redirect("/")
    } catch (e) {
        console.log(e)
        res.redirect("/")
    }
})
app.listen(80,()=>{
    console.log("server startd")
})