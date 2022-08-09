const User = require('../models/user');
const Ticket = require('../models/ticket');

const ticketStatusValidator = (status) =>{
  let status_enums = (Ticket.schema.path('status').enumValues);

  if(status_enums.includes(status)){
    return true;
  }
  return false;
}

const ticketPriorityValidator = (priority) =>{
  let priority_enums = (Ticket.schema.path('priority').enumValues);

  if(priority_enums.includes(priority)){
    return true;
  }
  return false;
}

const userRoleValidator = (role) =>{
  let role_enums = (User.schema.path('role').enumValues);

  if(role_enums.includes(role)){
      return true;
  }
  return false;
}

module.exports = {
  ticketStatusValidator,
  ticketPriorityValidator,
  userRoleValidator
}

