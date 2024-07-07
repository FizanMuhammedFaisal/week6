const jwt=require("jsonwebtoken")


const secret="hye$thingsome"

function setUser(user){
console.log(user)
payload={
    _id:user._id,
    username:user.username,
    email:user.email,
    role:user.role
}
return  jwt.sign(payload,secret)
}

function getUser(token){
    if(!token)
        return null
    try {
        return user=jwt.verify(token,secret)
    } catch (error) {
        return null
    }

}

module.exports={setUser,getUser}