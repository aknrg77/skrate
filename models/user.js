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
    password:{
        type:String,
        required:true
    },
    role: {
      type: String,
      enum: ['admin', 'employee'],
      default: 'employee'
    },

});



module.exports = mongoose.model("User",userSchema);




