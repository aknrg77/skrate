const Ticket = require('../models/ticket');
const User = require('../models/user');
const UserTicket = require('../models/userTicket');
const adminValidator = require('../helpers/adminValidator');

const validateCreateBody = async (req,res,next) =>{

  if(!adminValidator(req.user)){
    return res.status(401).json({"Message":"Unauthorized!!!"});
  }

  try{
    let userFound = await User.findOne({email: req.body.assignedTo});

    if(!userFound){
      return res.status(404).json({"Messege":"User must exist to be assigned!!!"});
    }
    req.assignedTo = userFound.id;
  
  }catch(error){
    return res.status(500).json({"Messege" : error.message});
  }


  return next();
}

const validateGetParam = (req,res,next) =>{

  if(req.query.status!= undefined && !ticketStatusValidator(req.query.status)){
    return res.status(500).json({ Message: "Invalid status" });
  }

  if(req.query.priority!= undefined && !ticketPriorityValidator(req.query.priority)){
    return res.status(500).json({ Message: "Invalid priority" });
  }

  return next();
}

const validateMarkAsClosed = async (req, res, next)=>{  
  let ticketId = req.body.ticketId || '';

  try{
    var ticket = await Ticket.findOne({uid: ticketId});
  }catch(error){
    return res.status(500).json({"Messege" : error.message});
  }

  if(!ticket){
    return res.status(404).json({"Messege" : "ticket Not Present"});
  }

  if(ticket.status === 1){
    return res.status(200).json({"Messege" : "ticket already closed"});
  }

  req.ticket = ticket;
  next();
}

const deleteTicket = async (req, res, next)=>{
  if(!adminValidator(req.user)){
    return res.status(401).json({"Message":"Unauthorized!!!"});
  }

  next();
}

module.exports = {
  validateCreateBody,
  validateGetParam,
  validateMarkAsClosed,
  deleteTicket
}