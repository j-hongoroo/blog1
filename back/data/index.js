const mongoose = require('mongoose');

let connectionDB = ()=>{
    let connect = mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
    })
    return connect
}

module.exports = connectionDB