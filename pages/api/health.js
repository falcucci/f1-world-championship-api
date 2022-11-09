const { StatusCodes, getReasonPhrase } = require('http-status-codes');

export default function handler(req, res) {
  res.status(StatusCodes.OK).json({ status: getReasonPhrase(200) })
}
