const createToken = (user) => {
  return {
    name: user.name,
    userId: user._id,
    role: user.role,
    subscription: user.subscription,
    standerd: user.standerd,
  }
}

module.exports =  createToken
