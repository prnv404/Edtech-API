import asynchandler from 'express-async-handler'

const getAllUser = asynchandler(async (req, res) => {
  res.send('getAllUser')
})
const getSingleUser = asynchandler(async (req, res) => {
  res.send('getSingleUser')
})
const updateUser = asynchandler(async (req, res) => {
  res.send('update user')
})




export { getAllUser, getSingleUser, updateUser }
