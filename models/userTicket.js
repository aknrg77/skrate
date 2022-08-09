const mongoose = require('mongoose');

const userTicketSchema = new mongoose.Schema({
        
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Ticket"
  }

});



module.exports = mongoose.model("UserTicket",userTicketSchema);




