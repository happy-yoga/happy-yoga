require('dotenv').config()
const path = require('path')
const express = require('express')

require('pug')
const morgan = require('morgan')
const helmet = require('helmet')
const i18n = require('i18next')
const i18nMiddleware = require('i18next-express-middleware')
const i18nBackend = require('i18next-node-fs-backend')
const contentfulRenderer = require('./lib/contentful-renderer.js')

const cache = require('./lib/http-cache.js')
const contentful = require('./lib/contentful-client.js')

const supportedLanguages = ['de', 'en']

i18n
  .use(i18nMiddleware.LanguageDetector)
  .use(i18nBackend)
  .init({
    preload: ['de'],
    backend: {
      // TODO: when entering a new language, this has to be dynamised
      loadPath: path.resolve(__dirname, 'locales/{{lng}}/main.yaml')
    }
  })

const courses = require('./data/courses.js')
const priceCategories = require('./data/price-categories.js')

const app = express()
app.enable('strict routing')

app.use(
  i18nMiddleware.handle(i18n, {
    removeLngFromUrl: false
  })
)

app.use(morgan('common'))
app.use(helmet())

app.set('view engine', 'pug')

app.use('/assets/styles', express.static('dist/styles'))
app.use('/assets/images', express.static('dist/images'))
app.use('/assets/javascripts', express.static('dist/javascripts'))
app.use('/', express.static('favicon'))

app.get('/', (req, res) => {
  res.redirect(`/${preferredLanguage(req)}/`)
})

app.get('/:lang', (req, res) => {
  res.redirect(`/${req.params.lang}/`)
})

app.get('/:lang/', cache('10m'), (req, res) => {
  contentful
    .page('landing-page')
    .then(page => {
      res.render('index', {
        page,
        t: t(req),
        lang: req.params.lang,
        courses: courses.schedule,
        priceCategories,
        cr: contentfulRenderer
      })
    })
    .catch(e => {
      console.log(e.message)
      res.render('error')
    })
})

app.get('/:lang/courses/:slug', cache('1d'), (req, res) => {
  res.render('course', {
    t: t(req),
    course: courses.findBySlug(req.params.slug)
  })
})

app.listen(process.env.PORT, () => {
  console.info(`application server started at port: ${process.env.PORT}`)
})

function preferredLanguage (req) {
  const fallback = 'de'
  const preferred = req.languages.reduce((curr, next) =>
    supportedLanguages.indexOf(curr) >= 0 ? curr : next
  )

  return supportedLanguages.indexOf(preferred) >= 0 ? preferred : fallback
}

function t (req) {
  req.i18n.changeLanguage(req.params.lang)
  return req.i18n.t.bind(req.i18n)
}
