
const express=require("express")
const router=express.Router()

router.get("/",(req,res)=>{
    const details=req.user

    res.render("layouts/home",{details:details.username})

})
module.exports=router