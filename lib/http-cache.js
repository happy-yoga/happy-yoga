const ms = require('ms')
const mcache = require('memory-cache')
const env = require('./env-helper.js')

const cache = duration => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url
    const cachedBody = mcache.get(key)

    if (env.isProduction() && cachedBody) {
      console.log('cache hit:', key)
      res.send(cachedBody)
    } else {
      console.log('cache miss', key)
      res.sendResponse = res.send
      res.send = body => {
        mcache.put(key, body, ms(duration))
        res.sendResponse(body)
      }
      next()
    }
  }
}

module.exports = cache
