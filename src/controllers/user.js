const express = require("express")
const app = require("..")


const User = require("../modules/user")

const router = express.Router()

router.get("/", async(req,res)=>{
    try{
        const page = +req.query.page || 1;
        const size = +req.query.size || 2;
        console.log(page, size)
        const offset = (page-1 )*size
        console.log(offset)
        const user = await User.find().skip(offset).limit(size).lean().exec()
        console.log()
        const totalPages = Math.ceil((await User.find().countDocuments())/size)
        console.log(totalPages)
        return res.json({user , totalPages})
    }catch(e){
       return res.status(500).json({message:e.message , status:"failed"})
    }
})


router.post("/", async(req,res)=>{
    try{
       const user =await User.create(req.body)
       return res.send({user})
    }catch(e){
       return res.status(500).json({message:e.message , status:"failed"})
    }
})

module.exports = router