// custom server to run tests

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const port = 3001
const dev = true
const hostname = 'localhost'
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare()

module.exports.app = createServer((req, res) => {
  const parsedUrl = parse(req.url, true)
  return handle(req, res, parsedUrl)
})
