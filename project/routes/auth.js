const express=require("express")
const router=express.Router()
const userController=require("../controllers/auth")
const {signinpage}=require("../middlewares/auth")

router.get("/signin",signinpage,(req,res)=>{
    
    res.render("auth/signin")
})
router.get("/signup",(req,res)=>{
    res.render("auth/signup")
})
router.get("/",(req,res)=>{
    res.redirect("/signin")
})

router.get("/logout",(req,res)=>{
    res.clearCookie('uid')
    res.redirect("/signin")
})


router.post("/login",userController.signInPageAuth)

router.post("/signup",userController.signUpUserCreate)


module.exports=router