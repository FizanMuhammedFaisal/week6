const express=require("express")
const USER = require("../models/userinfo")
const router=express.Router()
const bcrypt=require("bcrypt")
const saltRounds=10;

router.get("/:id",async(req,res)=>{
   const id=req.params.id
    const user=  await USER.findById(id)
    res.render("layouts/edit",{user:user})

})

//fucntion for hasing passworrd
const hashPassword= async function(pass){
    try {
        const done=await bcrypt.hash(pass,saltRounds)
        return done
    
    } catch (error) {
        console.error(error,"error handling message")
    }
 }



router.post("/:id",async(req,res)=>{
const id=req.params.id
console.log(req.body,"admin user details changin")
const pass=req.body.newPass

const hashedpassword = await hashPassword(pass)

if(req.body){
console.log('updating user')
        const updateduser={
            username:req.body.newName,
            password:hashedpassword
        }
        console.log(updateduser,"updated user")

     const yes=  await USER.findByIdAndUpdate(id ,updateduser,{ new: true })
     console.log(yes+'hey yes the actual thingis printed')
        res.redirect("/admin")
    
   
}


})

router.post("/:id/delete",async(req,res)=>{
    const id=req.params.id
    if(req.body){
    
            const updateduser={
                username:req.body.newName,
                password:req.body.newPass
            }
    
  await USER.findByIdAndDelete(id )

            res.redirect("/admin")
    }
    
    })


module.exports=router