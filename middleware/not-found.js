const notFound = async (req, res) => {
    res.status(404).json({ message: 'Route Not found' })
}

module.exports = notFound
