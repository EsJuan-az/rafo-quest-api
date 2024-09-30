module.exports = {
  success(req, res, status, body){
    return res.status(status).json({
      body,
      error: false,
      status,
    })
  },
  error(req, res, status, body){
    return res.status(status).json({
      body,
      error: true,
      status,
    })
  }
}