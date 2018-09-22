const mcache = require('memory-cache')

const cache = duration => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url
    const cachedBody = mcache.get(key)

    // if (process.env.NODE_ENV === 'production') {
    if (cachedBody) {
      console.log('cache hit:', key)
      res.send(cachedBody)
    } else {
      console.log('cache miss', key)
      res.sendResponse = res.send
      res.send = body => {
        mcache.put(key, body, duration * 1000)
        res.sendResponse(body)
      }
      next()
    }
    // } else {
    //   next()
    // }
  }
}

module.exports = cache
