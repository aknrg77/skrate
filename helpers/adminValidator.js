module.exports = (user) =>{
  if(user.role === 'admin'){
    return true;
  }
  return false;
}