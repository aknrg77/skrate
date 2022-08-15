const shortid = require('shortid');
require('dotenv').config();

const User = require('../models/user');
const Ticket = require('../models/ticket');
const UserTicket = require('../models/userTicket');
const adminValidator = require('../helpers/adminValidator');

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

const getAllTicket = async (req,res) =>{
  try{
    var tickets = await Ticket.find({});
  }catch(err){
    return res.status(500).json({ Message: err.message });
  }
  if(!tickets.length){
    return res.status(200).json({ Message: "There are No tickets" });
  }
  return res.status(201).json(tickets);
}

const getTicket = async (req,res) =>{
  let conditions = {};

  if(req.query.status){
    conditions.status = req.query.status;
  }
  if(req.query.title){
    conditions.title = req.query.title;
  }
  if(req.query.priority){
    conditions.priority = req.query.priority;
  }

  try{
    var tickets = await Ticket.find(conditions);
  }catch(err){
    return res.status(500).json({ Message: err.message });
  }

  if(!tickets.length){
    return res.status(200).json({ Message: "There are No tickets" });
  }
  return res.status(201).json(tickets);

}

const markClosedTicket = async (req, res) =>{

  let conditions = {};

  if(!adminValidator(req.user)){
    conditions['_id'] = req.user._id;
  }

  try{

  let user = await UserTicket.findOne({ticket: req.ticket._id}).populate({
    path: 'user',
    match: conditions
  });

 
  if(user.ticket === null || user.user === null){
    return res.status(401).json({"Message":"Unauthorized!!!"});
  }

  let user_tickets = await UserTicket.find({user: req.user._id, ticket: {$ne: req.ticket._id}}).populate({
    path: 'ticket',
    match: {
      $and:[
        {
          priority: {$gt: req.ticket.priority},
          status: 0
        }
      ]
    }
  });

  const mapped_tickets = user_tickets.filter(function(ticket) {
    return ticket['ticket']!== null
  }).map((ticket) => (ticket['ticket']));

  if(mapped_tickets.length){
    return res.status(400).json({"Message":"A higher priority task remains to be closed",
      "tickets": mapped_tickets
    });
  }

  await Ticket.updateOne({
    _id: req.ticket._id,
  }, {status: 1});

}catch(err){
  return res.status(500).json({ Message: err.message });
}

return res.status(200).json({"Message":"Ticket Closed!!!"});


}

const deleteTicket = async(req, res)=> {
  let ticketId = req.body.ticketId || '';

  try{
    var ticket = await Ticket.findOne({uid: ticketId});
    if(!ticket){
      return res.status(404).json({"Message":"Ticket Not Found!!!"});
    }
    await UserTicket.findOneAndDelete({ticket: ticket._id});
    await Ticket.findOneAndDelete({uid: ticketId});
  }catch(error){
    return res.status(500).json({"Messege" : error.message});
  }

  return res.status(204);
}



module.exports = {
  createTicket,
  getAllTicket,
  getTicket,
  markClosedTicket,
  deleteTicket
}
