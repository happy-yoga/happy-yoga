const slug = require('slug')

module.exports = str => slug(str, { lower: true })
