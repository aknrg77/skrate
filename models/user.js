const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        
    uid:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    role: {
      type: String,
      enum: ['admin', 'employee'],
      default: 'employee'
    },
    password:{
        type:String,
        required:true
    }

});



module.exports = mongoose.model("User",userSchema);




