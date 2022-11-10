const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const config = require("config")

export default function handler(req, res) {
  res.status(StatusCodes.OK).json({ status: getReasonPhrase(200) })
}
