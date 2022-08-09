const Ticket = require('../models/ticket');
const User = require('../models/user');

const {ticketPriorityValidator, ticketStatusValidator} = require('../helpers/enumValidator');

const validateCreateBody = async (req,res,next) =>{

  if(req.user.role!== 'admin'){
    return res.status(401).json({"Message":"Unauthorized!!!"});
  }

  try{
    let userFound = await User.findOne({email: req.body.assignedTo});

    if(!userFound){
      return res.status(404).json({"Messege":"User must exist to be assigned!!!"});
    }
    req.assignedTo = userFound.id;

    if(req.body.status!= undefined && !ticketStatusValidator(req.body.status)){
      return res.status(500).json({ Message: "Invalid status" });
    }

    if(req.body.priority!= undefined && !ticketPriorityValidator(req.body.priority)){
      return res.status(500).json({ Message: "Invalid priority" });
    }
  
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

module.exports = {
  validateCreateBody,
  validateGetParam
}