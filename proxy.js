const http = require('http')

module.exports = (req, res) => {
  var options = {
    hostname: req.headers['X-target'],
    path: req.url,
    method: req.method,
    headers: req.headers
  }

  var proxy = http.request(options, function (_res) {
    res.writeHead(_res.statusCode, _res.headers)
    _res.pipe(res, {
      end: true
    })
  })

  req.pipe(proxy, {
    end: true
  })
}
