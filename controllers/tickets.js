const shortid = require('shortid');
const User = require('../models/user');
const Ticket = require('../models/ticket');
const UserTicket = require('../models/userTicket');
require('dotenv').config();

const createTicket = async (req,res) =>{
  var {title, description, status, priority, assignedTo} = req.body;

  var ticket = new Ticket();
  var userTicket = new UserTicket();
  ticket.uid = shortid.generate();
  ticket.title = title;
  ticket.description = description;
  ticket.status = status;
  ticket.priority = priority;

  try{
    await ticket.save();
    userTicket.user = req.assignedTo;
    userTicket.ticket = ticket.id;
    await userTicket.save();
  }catch(err){
    return res.status(500).json({ Message: err.message });
  }
  return res.status(201).json(ticket);

}

const getTicket = async (req,res) =>{
  
}



module.exports = {
  createTicket,
  getTicket
}
