const Ticket = require('../models/ticket');
const User = require('../models/user');

const validateCreateBody = async (req,res,next) =>{

  try{
    let userFound = await User.findOne({email: req.body.assignedTo});

    if(!userFound){
      return res.status(404).json({"Messege":"User must exist to be assigned!!!"});
    }
    req.assignedTo = userFound.id;

    let status_enums = (Ticket.schema.path('status').enumValues);
    let priority_enums = (Ticket.schema.path('priority').enumValues);

    if(req.body.status!= undefined && !status_enums.includes(req.body.status)){
      return res.status(500).json({ Message: "Invalid status" });
    }

    if(req.body.priority!= undefined && !priority_enums.includes(req.body.priority)){
      return res.status(500).json({ Message: "Invalid priority" });
    }
  
  }catch(error){
    return res.status(500).json({"Messege" : error.message});
  }


  return next();
}

module.exports = {
  validateCreateBody
}