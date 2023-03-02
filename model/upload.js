var { Head } = require('../untils/config.js')
var fs = require('fs')
var url =require('url')



var uploadHead =async (req,res,next)=>{
  // console.log(req.body)
  // console.log(req.body.name)
  // console.log(req.file.originalname)
  // console.log(res)
  console.log("进入图片上传")
  Head.filename=req.body.time+Math.floor(Math.random()*1000000000)+req.file.originalname
  await fs.rename('public/upload/'+req.file.filename,'public/upload/'+Head.filename,function(){
  })
  console.log('图片新地址')
  console.log(Head.filename)
  res.send({
      msg:"上传头像成功",
      status:0,
      data:{
        url:url.resolve(Head.baseUrl,Head.filename)
      }
  })
  
}

module.exports = {
  uploadHead
}