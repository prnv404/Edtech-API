const createToken = (user) => {
   return {
      name: user.name,
      userId: user._id,
      isVerified: user.isVerified,
      standerd: user.standerd,
   };
};

module.exports = createToken;
