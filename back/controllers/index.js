const userSchema = require('../model/user');
const path = require('path')


exports.createUser = async(req,res,next)=>{
    try{
        let user = await userSchema.create(req.body)
        res.status(200).json({
            success:true,
            data:user
        })
    }catch(err){
        res.status(400).json({
            success:false,
            error:err
        })
    }
   
};



exports.login = async(req,res,next)=>{
    try{
        const {email,password}= req.body;
    if(!email || !password){
        return res.status(400).json({
            success : false,
            error:"email нууц үгээ оруулна уу"
        })
    }
    const user = await userSchema.findOne({email:email}).select('+password');
    const enteredUser = await user.checkPassword(password);
    console.log(enteredUser)
    if(!enteredUser){
        return res.status(400).json({
            success : false,
            error:"email нууц үгээ шалгана уу"
        })
    }
    const token = user.getJwt();
   const cookieOption = {
    expires:new Date(Date.now()+2*24*60*60*1000)
   }
    return   res.status(200).cookie("token",token,cookieOption).json({
        success:true,
        data:user,
        token,
    })

    }catch(err){
        res.status(400).json({
            success:false,
            error:err
        })
    }

}
exports.logout = (req,res,next)=>{
    res.cookie('token',"").json("logout")
}