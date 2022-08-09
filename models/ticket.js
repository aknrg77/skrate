const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({

    uid:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type: String,
        required:true
    },
    description:{
        type:String
    },
    status: {
      type: String,
      enum: {
        'open': 0,
        'close': 1
      },
      default: 0
    },
    priority: {
      type: Number,
      enum: {
        'low': 0,
        'medium': 1,
        'high': 2
      },
      default: 'low'
    }    

},{timestamps:true});


module.exports = mongoose.model("Ticket", ticketSchema);




