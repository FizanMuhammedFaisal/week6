const {getUser}=require("../services/auth")

async function restrictToLoggedInUserOnly (req,res,next){
try {
    const userUid=req.cookies.uid
    if(!userUid){
       return res.redirect("/signup")
    }
    const user= await getUser(userUid)
    if(!user){
       return res.redirect("signup")
    }
    req.user=user
    next()
} catch (error) {
    console.log("internal server error",error)
}

}

 async function signinpage(req,res,next){
    const userUid=req.cookies.uid
    if(userUid){
        const user= await getUser(userUid)
        if(user){
            res.redirect("/home")
         }
    }
    
    next()
   
}

async function handleAdminLogin(req,res,next){
    const userUid=req.cookies.uid
    if(!userUid){
return  res.status(401).render("auth/adminSignin")

    }
    const user=await getUser(userUid)
    if(!user){
        res.status(401).render("auth/adminSignin",{messages:"Invalid Username or Password"})

    }
    const role=user.role
    if(role==='admin'){
        next()
    }else{
        return    res.status(401).render("auth/adminSignin")
    }
    
}


module.exports={restrictToLoggedInUserOnly,signinpage,handleAdminLogin}