function handleError(err, req, res, next) {
    res.status(500)
    res.json({
        message: err.message
    })
}

module.exports = handleError