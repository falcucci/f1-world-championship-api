const { StatusCodes, getReasonPhrase } = require('http-status-codes');

module.exports = function handler(req, res) {
  res.status(StatusCodes.OK).json({ status: getReasonPhrase(200) })
}
