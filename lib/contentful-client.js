const ms = require('ms')
const mcache = require('memory-cache')
const hash = require('object-hash')
const contentful = require('contentful')
const env = require('./env-helper.js')

const contentfulCachingTime = (() => {
  if (!process.env.CONTENTFUL_CACHE_TTL) {
    throw new Error('No contentful entry caching time defined')
  }
  ms(process.env.CONTENTFUL_CACHE_TTL)
})()

const accessToken = (() => {
  const token = env.isProduction()
    ? process.env.CONTENTFUL_DELIVERY_TOKEN
    : process.env.CONTENTFUL_PREVIEW_TOKEN

  if (!token) {
    throw new Error('No Contentful Token given')
  }

  return token
})()

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: '3fn71qsrf5nv',
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken,

  host: env.isProduction() ? 'cdn.contentful.com' : 'preview.contentful.com'
})

const cachedClient = client => {
  return {
    getEntries (query) {
      const cachekey = `getEntries-${hash(query)}`
      const cached = mcache.get(cachekey)

      if (env.isProduction() && cached) {
        console.log('getEntries (CACHE_HIT)')
        return Promise.resolve(cached)
      } else {
        console.log('getEntries (CACHE_MISS)')
        return client
          .getEntries(query)
          .then(res => client.parseEntries(res))
          .then(res => {
            mcache.put(cachekey, res, contentfulCachingTime)
            return res
          })
      }
    }
  }
}

module.exports = {
  client: cachedClient(client),

  pages () {
    return this.client.getEntries({
      content_type: 'page'
    })
  },

  page (title) {
    return this.client
      .getEntries({
        content_type: 'page',
        'fields.title': title
      })
      .then(entry => entry.items[0].fields)
      .catch(e => e)
  }
}
