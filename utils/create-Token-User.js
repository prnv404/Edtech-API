const createToken = (user) => {
    return {
        name: user.name,
        userId: user._id,
        isVerified: user.isVerified,
        standred: user.standred,
        mobNumber: user.mobNumber,
        role: user.role,
    }
}

module.exports = createToken
