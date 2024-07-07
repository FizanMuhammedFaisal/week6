const express=require("express")
const mongoose=require("mongoose")
const app=express()
const PORT=8000
const auth=require("./routes/auth")
const admin=require('./routes/admin')
const path=require("path")
const edit=require("./routes/edit")
const {restrictToLoggedInUserOnly,handleAdminLogin}=require("./middlewares/auth")
const cookieParser = require('cookie-parser');
const userNoAcess=require("./routes/userNoAcess")
const nocache=require("nocache")
const morgan=require("morgan")

mongoose.connect('mongodb://localhost:27017/userdata',{}

)
.then(()=>{
    console.log("mongodb connnected")

})
.catch(()=>{
    console.log("error got into mongoo")
})

app.use(nocache())
app.use(morgan('dev'))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))

app.use(express.json())
app.set("view engine",'hbs')
app.set('views', path.join(__dirname, 'views'));


app.use("/",auth)
app.use("/admin",handleAdminLogin,admin)
app.use("/edit",edit)
app.use("/home",restrictToLoggedInUserOnly,userNoAcess)


app.use(function(req, res, next) {
    res.status(404).send("  404  Sorry, can't find the page ");
});
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})