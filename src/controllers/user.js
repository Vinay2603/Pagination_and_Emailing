const express = require("express")



const User = require("../modules/user")
const sendMail = require("../utils/send-mail")
const router = express.Router()

router.get("/", async(req,res)=>{
    try{
        const page = +req.query.page || 2;
        const size = +req.query.size || 2;
        //console.log(page, size)
        const offset = (page-1 )*size
        //console.log(offset)
        const user = await User.find().skip(offset).limit(size).lean().exec()
       // console.log()
        const totalPages = Math.ceil(  ( (await User.find().countDocuments())/size  )  )
        //console.log(totalPages)
        return res.json({user , totalPages})
    }catch(e){
       return res.status(500).json({message:e.message , status:"failed"})
    }
})


router.post("/", async(req,res)=>{
    try{
       const user =await User.create(req.body)
      const to_array =["qwerty@a.com","asdf@a.com", "zxcvb@a.com","tyuio@a.com","post@a.com"]
      const to_string = to_array.join(",")
 
       sendMail(
          "vinay@gmail.com",
           to_string,
       `Welcome to ABC system ${req.body.first_name} ${req.body.last_name}`,
       `Please welcome ${req.body.first_name} ${req.body.last_name}`, 
       "<h1> Please confirm your email address </h1>")

       return res.send({user})
    }catch(e){
       return res.status(500).json({message:e.message , status:"failed"})
    }
})

module.exports = router