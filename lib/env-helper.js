const mode = () =>
  process.env.NODE_ENV === 'production' ? 'production' : 'development'

const isProduction = () => mode() === 'production'

const isDevelopment = () => !isProduction()

module.exports = {
  mode,
  isProduction,
  isDevelopment
}
