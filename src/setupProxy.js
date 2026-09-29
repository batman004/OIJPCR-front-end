const httpProxyMiddleware = require('http-proxy-middleware')

// http-proxy-middleware 0.x exports the factory itself; 1.x+ exports it as a named member.
const createProxy = httpProxyMiddleware.createProxyMiddleware || httpProxyMiddleware

const target = process.env.API_PROXY_TARGET || 'http://localhost:5001'

module.exports = function (app) {
  app.use(
    '/_api',
    createProxy({
      target,
      changeOrigin: true,
      pathRewrite: { '^/_api': '' },
    }),
  )
}
