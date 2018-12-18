const ms = require('milliseconds')
const mcache = require('memory-cache')
const hash = require('object-hash')
const contentful = require('contentful')

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: '3fn71qsrf5nv',
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken:
    process.env.NODE_ENV === 'production'
      ? '50713daffaa6559dd0626b97dd98c53423c93e5bf914b651e334ef7efc2b1156'
      : 'c691ca912c3f80502a477489c46af37e0387f1653ca7dd21a001b05a8ea5c54f',
  host:
    process.env.NODE_ENV === 'production'
      ? 'cdn.contentful.com'
      : 'preview.contentful.com'
})

const cachedClient = client => {
  return {
    getEntries (query) {
      const cachekey = `getEntries-${hash(query)}`
      const cached = mcache.get(cachekey, ms.minutes(10))

      if (cached) {
        console.log('getEntries (CACHE_HIT)')
        return Promise.resolve(cached)
      } else {
        console.log('getEntries (CACHE_MISS)')
        return client.getEntries(query).then(res => {
          mcache.put(cachekey, res)
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
      .then(entry => client.parseEntries(entry))
      .then(entry => entry.items[0].fields)
      .catch(e => e)
  }
}
