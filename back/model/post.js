const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:{
        type:String,
        required:[true,"хэрэглэгчийн нэрийг оруулна уу...."],
        
    },

    photo:{
        type:String,
        required:false,
        default:"noImage.jpg"
    },
    description:{
        type:String,
        required:[true,"тайлбар оруулна уу ..."],
    },
    createUserId:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now,
    },
  
});


module.exports = mongoose.model('post',postSchema);