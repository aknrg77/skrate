const shortid = require('shortid');
require('dotenv').config();

const User = require('../models/user');
const Ticket = require('../models/ticket');
const UserTicket = require('../models/userTicket');
const {ticketPriorityValidator, ticketStatusValidator} = require('../helpers/enumValidator');
const { query } = require('express');

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



module.exports = {
  createTicket,
  getAllTicket,
  getTicket
}
