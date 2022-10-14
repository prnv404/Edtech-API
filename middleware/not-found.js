const notFound = async (req, res) => {
  res.status(404).json({ message: 'Route NOt found' })
}

module.exports =  notFound
