const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type:String,
        required:[true,"хэрэглэгчийн нэрийг оруулна уу...."],
        
    },
    email:{
        type:String,
        required:[true,"email  оруулна уу...."],
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"email буруу байна"]
        
    },
    profile:{
        type:String,
        required:false,
        default:"noImage.jpg"
    },
    password:{
        type:String,
        minlength:4,
        required:[true,"нууц үгээ оруулна уу...."],
        select:false,
        
    },
    posts:{
        type:Schema.Types.ObjectId,
        ref:"post"
    },
    createAt:{
        type:Date,
        default:Date.now,
    },
  
});
userSchema.pre("save",async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
   });
userSchema.methods.checkPassword =  async function(enteredpassword){
    const ok = await bcrypt.compare(enteredpassword,this.password);
    console.log(ok)
    return ok
}
userSchema.methods.getJwt = function(){
    const token = jwt.sign({id:this._id,username:this.userName},process.env.JWT_SECRET,{
        expiresIn:process.env.EXPIRESIN
    });
    return token
}

module.exports = mongoose.model('user',userSchema);
