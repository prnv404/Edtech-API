const Jwt = require('jsonwebtoken')

const createJwt = ({ payload }) => {
    const token = Jwt.sign(payload, process.env.JWT_SECRET)
    return token
}

const isTokenValid = ({ token }) => {
    return Jwt.verify(token, process.env.JWT_SECRET)
}

const attachCookieToResponse = ({ res, user }) => {
    // user.verified = verified.verified;
    const token = createJwt({ payload: user })
    const oneDay = 1000 * 60 * 60 * 24
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    })
}

module.exports = { createJwt, isTokenValid, attachCookieToResponse }
