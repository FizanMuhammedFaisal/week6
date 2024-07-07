const express=require("express")
const router=express.Router()
const USER=require("../models/userinfo")
const {handleAdminUserAdd}=require("../controllers/auth")

router.get("/",async(req,res)=>{
  const  all_details=await USER.find({role:"user"})
  const details=all_details.map((user)=>{
   return {username:user.username,
    password:user.password,
    _id:user._id,
    email:user.email
}
  })
 res.render("layouts/admin",{details:details})
})
router.get("/add",(req,res)=>{
  res.render("layouts/userAdd")
})


router.get("/signin",(req,res)=>{
  res.render("auth/adminSignin")
})
router.post('/add',handleAdminUserAdd)

module.exports=router