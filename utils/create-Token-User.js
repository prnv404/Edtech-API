const createToken = (user, verified) => {
   return {
      name: user.name,
      userId: user._id,
      isVerified: verified.verified,
      standerd: user.standerd,
   };
};

module.exports = createToken;
