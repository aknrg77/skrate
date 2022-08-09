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
      enum: ['open', 'close'],
      default: 'open'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'low'
    },
    assignedTo: {
        type:mongoose.Schema.Types.ObjectId,
        ref : "User"
    }

    

},{timestamps:true});


module.exports = mongoose.model("Ticket", ticketSchema);




