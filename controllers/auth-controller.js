import asyncHandler from 'express-async-handler'

const signup = asyncHandler(async (req, res) => {
  res.send('signup')
})
const login = asyncHandler(async (req, res) => {
  res.send('login')
})
const logout = asyncHandler(async (req, res) => {
  res.send('logout')
})

export { signup, login, logout }
