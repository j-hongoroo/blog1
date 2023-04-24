const postSchema = require('../model/post');
const path = require('path');


exports.getPosts = async(req,res,next)=>{
    console.log(req.query)
    try{
        const data = await postSchema.find(req.query);
        res.status(200).json({
            success:true,
            data:data
        })
    }catch(err){
        res.status(400).json({
            success:false,
            error:err
        })
    }
}
exports.getPost = async(req,res,next)=>{
    try{
        const data = await postSchema.findById(req.params.id);
        res.status(200).json({
            success:false,
            data:data
        })
    }catch(err){
        res.status(400).json({
            success:false,
            error:err
        })
    }
}

exports.createPost = async(req,res,next)=>{
    console.log(req.body)
    console.log(req.files.file);
    try{
        const file = req.files.file
    if(!file.mimetype.startsWith("image")){
        return  res.status(400).json({
            success:false,
            error:"зураг оруулна уу"
        })
    }
    if(file.size>100000){
        return  res.status(400).json({
            success:false,
            error:"зурагны хэмжээ хэтэрсэн байна"
        })
    }
    let filename= file.name;
 
    file.mv(`./upload/${filename}`,(err)=>{
        if(err){
            return  res.status(400).json({
                success:false,
                error:"зурагны хуулах явцад алдаа гарлаа"
            })
        }
   
    });
    let createUserId = req.userId;
    const {title,description} = req.body
        let post = await postSchema.create({
            title,
            photo:filename,
            description,
            createUserId
        });
        res.status(200).json({
            success:true,
            data:post
        })
    }catch(err){
        res.status(400).json({
            success:false,
            error:err
        })
    }
};

exports.editPost = async  (req,res,next)=>{
    try{
        const file = req.files.file
    if(!file.mimetype.startsWith("image")){
        return  res.status(400).json({
            success:false,
            error:"зураг оруулна уу"
        })
    }
    if(file.size>100000){
        return  res.status(400).json({
            success:false,
            error:"зурагны хэмжээ хэтэрсэн байна"
        })
    }
    let filename= file.name;
 
    file.mv(`./upload/${filename}`,(err)=>{
        if(err){
            return  res.status(400).json({
                success:false,
                error:"зурагны хуулах явцад алдаа гарлаа"
            })
        }
   
    });
    let createUserId = req.userId;
    const {title,description} = req.body
    let posDoc = await postSchema.findByIdAndUpdate(req,params.id,{
        title,
        photo:filename,
        description,
        createUserId})
        
        res.status(200).json({
            success:true,
            data:posDoc
        })
    }catch(err){
        res.status(400).json({
            success:false,
            error:err
        })
    }
}
exports.deletePost = async (req,res,next)=>{
    try{
        let data = await postSchema.findByIdAndRemove(req.params.id);

        res.status(200).json({
            success:true,
            data:data
        })
    }catch(err){
        res.status(400).json({
            success:true,
            error:err
        })
    }
}